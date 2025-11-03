import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { AddressResDto } from 'src/common/dto/AddressResDto';
import { AddressApiService } from 'src/common/services/address-api.service';
import { v4 as uuidv4 } from 'uuid';
import { CreateStoreDto } from './dto/create-store.dto';
import { ReqestCreateStoreDto } from './dto/request-create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { StoresService } from './stores.service';

@Controller('stores')
export class StoresController {
  constructor(
    private readonly addressApiService: AddressApiService,
    private readonly storesService: StoresService) { }

  @Post()
  async create(@Body() reqestCreateStoreDto: ReqestCreateStoreDto) {
    console.info('店舗作成リクエスト', reqestCreateStoreDto);

    //緯度と経度を取得
    const addressRes: AddressResDto = await this.addressApiService.searchAddress(reqestCreateStoreDto.address);
    const storeId = uuidv4();
    const createStoreDto: CreateStoreDto = {
      storeId: storeId,
      storeName: reqestCreateStoreDto.storeName,
      address: reqestCreateStoreDto.address,
      content: reqestCreateStoreDto.content,
      lat: addressRes.lat,
      lng: addressRes.lng,
    };
    const result = await this.storesService.create(createStoreDto);
    return result;
  }

  @Get()
  findAll(@Query('searchName') searchName: string, @Query('tagName') tagName: string) {
    return this.storesService.findAll(searchName, tagName);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.storesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStoreDto: UpdateStoreDto) {
    return this.storesService.update(+id, updateStoreDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.storesService.remove(+id);
  }
}
