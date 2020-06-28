import {ICryptoCurrency} from "@/domain/ICryptoCurrency";

export interface IPortfolioItemCreate {
    crypto: ICryptoCurrency,
    amount: number,
    dateOfPurchase: Date,
    location: string
}
