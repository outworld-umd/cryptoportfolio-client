import {ICryptoCurrency} from "@/domain/ICryptoCurrency";

export interface IPortfolioItem {
    id: number,
    crypto: ICryptoCurrency,
    amount: number,
    dateOfPurchase: Date,
    location: string,
    marketValue: number
}
