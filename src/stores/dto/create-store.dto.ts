export class CreateStoreDto {
    storeId: string;
    storeName: string;
    address: string;
    content: string;
    lat: number;
    lng: number;
    tags: string[];
}
