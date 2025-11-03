import { IsArray, IsNotEmpty, IsString, Length } from 'class-validator';

export class ReqestCreateStoreDto {
    @IsString({ message: '店舗名は文字列である必要があります' })
    @IsNotEmpty({ message: '店舗名は必須です' })
    @Length(1, 100, { each: true, message: '店舗名の各要素は1〜100文字である必要があります' })
    storeName: string;

    @IsString({ message: '住所は文字列である必要があります' })
    @IsNotEmpty({ message: '住所は必須です' })
    @Length(1, 100, { each: true, message: '住所の各要素は1〜100文字である必要があります' })
    address: string;

    @IsString({ message: '内容は文字列である必要があります' })
    @IsNotEmpty({ message: '内容は必須です' })
    @Length(1, 100, { each: true, message: '内容の各要素は1〜100文字である必要があります' })
    content: string

    @IsArray({ message: 'タグは配列である必要があります' })
    @IsString({ each: true, message: 'タグの各要素は文字列である必要があります' })
    @Length(1, 100, { each: true, message: 'タグの各要素は1〜100文字である必要があります' })
    tags: string[];
}
