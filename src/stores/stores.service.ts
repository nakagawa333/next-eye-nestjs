import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
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
  ) { }
  async create(createStoreDto: CreateStoreDto) {
    console.info("店舗作成リクエスト", createStoreDto);
    const storesEntity: StoresEntity = new StoresEntity();
    storesEntity.storeId = createStoreDto.storeId;
    storesEntity.storeName = createStoreDto.storeName;
    storesEntity.address = createStoreDto.address;
    storesEntity.content = createStoreDto.content;
    storesEntity.lat = createStoreDto.lat;
    storesEntity.lng = createStoreDto.lng;

    console.info(storesEntity);

    try {
      const createStoresEntity: StoresEntity = this.storesRepository.create(storesEntity);
      return await this.manager.transaction(async () => {
        const store = await this.storesRepository.save(createStoresEntity);
        return store;
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
