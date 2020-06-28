<template>
    <tbody>
        <tr class="row">
            <th class="col-sm-2">Cryptocurrency</th>
            <th class="col-sm-2">Amount</th>
            <th class="col-sm-2">Date of purchase</th>
            <th class="col-sm-3">Wallet location</th>
            <th class="col-sm-2">Current market value</th>
            <th class="col-sm-1"></th>
        </tr>
        <tr class="row" v-for="item in items" :key="item.id">
            <td class="col-sm-2">{{item.crypto.name}}</td>
            <td class="col-sm-2">{{item.amount}}</td>
            <td class="col-sm-2">{{formatDate(item.dateOfPurchase)}}</td>
            <td class="col-sm-3">{{item.location}}</td>
            <td class="col-sm-2">{{item.marketValue}} €</td>
            <td class="col-sm-1"><button @click="deleteOnClick(item)" type="button" class="btn btn-danger">Delete</button></td>
        </tr>
    </tbody>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import store from "@/store"
import { IPortfolioItem } from "@/domain/IPortfolioItem";

@Component
export default class Portfolio extends Vue {
    get items(): IPortfolioItem[] {
        return store.state.portfolioItems;
    }

    deleteOnClick(item: IPortfolioItem): void {
        store.dispatch('deletePortfolioItem', item.id);
    }

    formatDate(date: Date): string {
        const d = new Date(date);
        let month = '' + (d.getMonth() + 1);
        let day = '' + d.getDate();
        const year = d.getFullYear();
        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;
        return [day, month, year].join('.');
    }

    beforeCreate(): void {
        console.log("beforeCreate");
    }

    created(): void {
        console.log("created");
    }

    beforeMount(): void {
        console.log("beforeMount");
    }

    mounted(): void {
        console.log("mounted");
        store.dispatch("getPortfolioItems");
    }

    beforeUpdate(): void {
        console.log("beforeUpdate");
    }

    updated(): void {
        console.log("updated");
    }

    beforeDestroy(): void {
        console.log("beforeDestroy");
    }

    destroyed(): void {
        console.log("destroyed");
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .table td, .table th {
        text-align: center;
    }
</style>
