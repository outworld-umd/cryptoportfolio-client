import Vue from 'vue'
import Vuex from 'vuex'
import { CryptoCurrencyApi } from '@/services/CryptoCurrencyApi';
import { ICryptoCurrency } from "@/domain/ICryptoCurrency";
import { IPortfolioItem } from "@/domain/IPortfolioItem";
import { PortfolioItemApi } from "@/services/PortfolioItemApi";
import { IPortfolioItemCreate } from "@/domain/IPortfolioItemCreate";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        cryptoCurrencies: [] as ICryptoCurrency[],
        portfolioItems: [] as IPortfolioItem[]
    },
    mutations: {
        setCryptoCurrencies(state: any, cryptoCurrencies: ICryptoCurrency[]) {
            state.cryptoCurrencies = cryptoCurrencies;
        },
        setPortfolioItems(state: any, portfolioItems: IPortfolioItem[]) {
            state.portfolioItems = portfolioItems;
        }
    },
    actions: {
        async getCryptoCurrencies(context): Promise<void> {
            const cryptoCurrencies = await CryptoCurrencyApi.getAll();
            context.commit('setCryptoCurrencies', cryptoCurrencies);
        },
        async getPortfolioItems(context): Promise<void> {
            const portfolioItems = await PortfolioItemApi.getAll();
            context.commit('setPortfolioItems', portfolioItems);
        },
        async createPortfolioItem(context, item: IPortfolioItemCreate): Promise<void> {
            context.state.errors = await PortfolioItemApi.create(item);
            if (!context.state.errors) await context.dispatch('getPortfolioItems');
        },
        async deleteCryptoCurrency(context, id: string): Promise<void> {
            await CryptoCurrencyApi.delete(id);
            await context.dispatch('getCryptoCurrencies');
        },
        async deletePortfolioItem(context, id: string): Promise<void> {
            await PortfolioItemApi.delete(id);
            await context.dispatch('getPortfolioItems');
        }
    },
    modules: {
    }
})
