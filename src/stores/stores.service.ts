import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { StoresTagsEntity } from 'src/storeTags/entities/stores-tags.entity';
import { TagsEntity } from 'src/tags/entities/tags.entity';
import { EntityManager, Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { StoresEntity } from './entities/stores.entity';

@Injectable()
@ApiTags('/stores')
export class StoresService {
  constructor(
    @InjectEntityManager() private readonly manager: EntityManager,
    @InjectRepository(StoresEntity)
    private storesRepository: Repository<StoresEntity>,
    @InjectRepository(TagsEntity)
    private tagsRepository: Repository<TagsEntity>,
    @InjectRepository(StoresTagsEntity)
    private storesTagsEntity: Repository<StoresTagsEntity>,
  ) { }
  async create(createStoreDto: CreateStoreDto) {
    console.info("店舗作成リクエスト開始", createStoreDto);

    try {
      return await this.manager.transaction(async () => {
        const createStoresEntity: StoresEntity = this.storesRepository.create(
          {
            storeId: createStoreDto.storeId,
            storeName: createStoreDto.storeName,
            address: createStoreDto.address,
            content: createStoreDto.content,
            lat: createStoreDto.lat,
            lng: createStoreDto.lng,
          }
        );
        //店舗テーブル新規追加処理
        const store: StoresEntity = await this.storesRepository.save(createStoresEntity);

        const tagNames = createStoreDto.tags;

        //該当するタグ名が既に存在するかを確認する
        const existingTags: TagsEntity[] = await this.tagsRepository
          .createQueryBuilder('tags')
          .where('tags.tag_name IN (:...tagNames)', { tagNames })
          .getMany();

        const existingTagNamesSet: Set<string> = new Set(existingTags.map(selectTag => selectTag.tagName));

        const newTagsEntities = tagNames
          .filter(tag => !existingTagNamesSet.has(tag))
          .map(tag => {
            return this.tagsRepository.create({
              tagId: uuidv4(),
              tagName: tag,
            });
          });

        // 新規タグをDBに保存
        const savedNewTags: TagsEntity[] = await this.tagsRepository.save(newTagsEntities);

        // 中間テーブル登録用に既存タグと新規タグをまとめる
        const allTagsForStore: TagsEntity[] = [...existingTags, ...savedNewTags];

        const storesTagsEntities = allTagsForStore.map(tag =>
          this.storesTagsEntity.create({
            storesTagsId: uuidv4(),
            store: store,
            tag: tag,
          })
        );

        //中間テーブル新規追加処理
        await this.storesTagsEntity.save(storesTagsEntities);
        //新規データが作成されたタグID一覧
        const tagIds: string[] = savedNewTags.map(tag => tag.tagId);

        return {
          storeId: store.storeId,
          tagIds: tagIds,
        };
      });
    } catch (error: any) {
      console.error('DB Insert失敗', error);
      throw new HttpException('ストア作成に失敗しました', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  findAll(searchName: string, tagName: string) {
    console.info("店舗一覧取得リクエスト");

    return {
      "searchName": searchName,
      "tagName": tagName
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} store`;
  }

  update(id: number, updateStoreDto: UpdateStoreDto) {
    return `This action updates a #${id} store`;
  }

  remove(id: number) {
    return `This action removes a #${id} store`;
  }
}
