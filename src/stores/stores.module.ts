/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressApiService } from 'src/common/services/address-api.service';
import { StoresTagsEntity } from 'src/storeTags/entities/stores-tags.entity';
import { TagsEntity } from 'src/tags/entities/tags.entity';
import { StoresEntity } from './entities/stores.entity';
import { StoresController } from './stores.controller';
import { StoresService } from './stores.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([StoresEntity, TagsEntity, StoresTagsEntity])
  ],
  controllers: [StoresController],
  providers: [StoresService, AddressApiService],
  exports: [StoresService, AddressApiService]
})
export class StoresModule { }
