import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import axios from "axios";

@Injectable()
export class AddressApiService {
    async searchAddress(address: string) {
        console.info("国土地理院API呼び出し", address);

        let res: any = {};
        try {
            const url: string = `https://msearch.gsi.go.jp/address-search/AddressSearch?q=${address}`;
            res = await axios.get(url);
        } catch (error: any) {
            if (axios.isAxiosError(error)) {
                console.error("国土地理院API呼び出し失敗", error.message);
                throw new HttpException("国土地理院API呼び出し失敗", HttpStatus.BAD_REQUEST);
            }

            console.error("予期せぬエラーが発生", error);
            throw new HttpException(
                'サーバー内エラー',
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }

        if (!res || !res.data || res.data.length === 0) {
            console.warn(`該当する住所が存在しませんでした:${address}`);
            throw new HttpException("該当する住所が存在しませんでした", HttpStatus.NOT_FOUND);
        }

        const data: any = res.data;
        const geometry: string | undefined = data[0]["geometry"];
        if (!data || !geometry || !geometry["coordinates"]) {
            console.warn(`該当する住所が存在しませんでした:${address}`);
            throw new HttpException("該当する住所が存在しませんでした", HttpStatus.NOT_FOUND);
        }

        const [lng, lat] = geometry["coordinates"];

        return {
            "lng": Number(lng),
            "lat": Number(lat)
        }
    }
}