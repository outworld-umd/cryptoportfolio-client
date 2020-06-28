import Axios from 'axios';
import { IResponse } from "@/domain/IResponse";
import { ICryptoCurrency } from "@/domain/ICryptoCurrency";

export abstract class CryptoCurrencyApi {
    private static axios = Axios.create(
        {
            baseURL: "https://cryptoportfolio-api.herokuapp.com/api/currencies/",
            headers: {
                common: {
                    'Content-Type': 'application/json'
                }
            }
        }
    )

    static async getAll(): Promise<ICryptoCurrency[]> {
        const url = "";
        try {
            const response = await this.axios.get<IResponse>(url);
            if (response.status === 200) {
                return response.data.body as ICryptoCurrency[];
            }
            return [];
        } catch (error) {
            console.log('error: ', (error as Error).message);
            return [];
        }
    }

    static async create(item: ICryptoCurrency): Promise<ICryptoCurrency | string[]> {
        const url = "add/";
        const response = await this.axios.post(url, item);
        if (response.status === 201) return response.data.body as ICryptoCurrency;
        return response.data.body as string[];
    }

    static async delete(id: string): Promise<void> {
        const url = "delete/" + id;
        try {
            const response = await this.axios.delete<IResponse>(url);
            if (response.status === 200) {
                return;
            }
            return;
        } catch (error) {
            console.log('error: ', (error as Error).message);
        }
    }
}
