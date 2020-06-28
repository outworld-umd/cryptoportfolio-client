import Axios, { AxiosResponse } from 'axios';
import { IResponse } from "@/domain/IResponse";
import { IPortfolioItem } from "@/domain/IPortfolioItem";
import { IPortfolioItemCreate } from "@/domain/IPortfolioItemCreate";

export abstract class PortfolioItemApi {
    private static axios = Axios.create(
        {
            baseURL: "https://cryptoportfolio-api.herokuapp.com/api/items/",
            headers: {
                common: {
                    'Content-Type': 'application/json'
                }
            }
        }
    )

    static async getAll(): Promise<IPortfolioItem[]> {
        const url = "";
        try {
            const response = await this.axios.get<IResponse>(url);
            console.log('getAll response', response);
            if (response.status === 200) {
                return response.data.body as IPortfolioItem[];
            }
            return [];
        } catch (error) {
            console.log('error: ', (error as Error).message);
            return [];
        }
    }

    static async create(item: IPortfolioItemCreate): Promise<string[]> {
        const url = "add/";
        try {
            const response = await this.axios.post<IResponse>(url, item);
            return response.data.body as string[];
        } catch (error) {
            console.log('error: ', error);
            return [];
        }
    }

    static async delete(id: string): Promise<void> {
        const url = "delete/" + id;
        try {
            const response = await this.axios.delete<IResponse>(url);
            console.log('delete response', response);
            if (response.status === 200) {
                return;
            }
            return;
        } catch (error) {
            console.log('error: ', (error as Error).message);
        }
    }
}
