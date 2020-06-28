<template>
    <thead>
        <tr class="row">
            <th class="col-sm-2">
                <label>
                    <select class="form-control" v-model="$v.itemCreate.crypto.$model">
                        <option disabled v-bind:value="null" v-bind:key="null" selected>Select currency</option>
                        <option v-for="crypto in currencies" v-bind:value="crypto" v-bind:key="crypto.id">{{ crypto.name }}</option>
                    </select>
                </label>
                <small v-if="$v.itemCreate.crypto.$error" class="text-danger">
                    <div v-if="!$v.itemCreate.crypto.required">Field is required!</div>
                </small>
            </th>
            <th class="col-sm-2">
                <div>
                    <label>
                        <input class="form-control" v-model.trim="$v.itemCreate.amount.$model" type="number" placeholder="Amount">
                    </label>
                    <small v-if="$v.itemCreate.amount.$error" class="text-danger">
                        <div v-if="!$v.itemCreate.amount.required">Field is required!</div>
                        <div v-if="$v.itemCreate.amount.required && !$v.itemCreate.amount.minValue">Amount must be greater than 0!</div>
                    </small>
                </div>
            </th>
            <th class="col-sm-2">
                <div>
                    <label>
                        <input class="form-control" v-model.trim="$v.itemCreate.dateOfPurchase.$model" type="date" placeholder="Date of purchase (optional)">
                    </label>
                    <small v-if="$v.itemCreate.dateOfPurchase.$error" class="text-danger">
                        <div v-if="!$v.itemCreate.dateOfPurchase.minValue">Date of purchase cannot be in future!</div>
                    </small>
                </div>
            </th>
            <th class="col-sm-3">
                <label>
                    <input class="form-control" v-model.trim="$v.itemCreate.location.$model" type="text" placeholder="Wallet location (optional)">
                </label>
                <small v-if="$v.itemCreate.location.$error" class="text-danger">
                    <div v-if="!$v.itemCreate.location.maxValue">Location description cannot be longer than 100 characters!</div>
                </small>
            </th>
            <th class="col-sm-2">
                <button class="btn btn-outline-info" type="button" @click="reset">Reset</button>
            </th>
            <th class="col-sm-1">
                <button class="btn btn-success" type="button" @click="submit">Save</button>
            </th>
        </tr>
    </thead>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import store from "@/store"
import { validationMixin } from 'vuelidate'
import { IPortfolioItemCreate } from "@/domain/IPortfolioItemCreate";
import { ICryptoCurrency } from "@/domain/ICryptoCurrency";
import { maxLength, required } from "vuelidate/lib/validators";

@Component({
    mixins: [validationMixin],
    validations: {
        itemCreate: {
            crypto: {
                required
            },
            amount: {
                required,
                minValue: v => v > 0
            },
            dateOfPurchase: {
                minValue: v => !v || v < new Date().toISOString()
            },
            location: {
                maxLength: maxLength(100)
            }
        }
    }
})
export default class PortfolioCreate extends Vue {
    itemCreate: IPortfolioItemCreate = {
        crypto: null,
        amount: null,
        dateOfPurchase: null,
        location: null
    };

    get errors(): string[] {
        return store.state.errors;
    }

    get currencies(): ICryptoCurrency[] {
        return store.state.cryptoCurrencies;
    }

    create(): void {
        store.dispatch('createPortfolioItem', this.itemCreate);
    }

    reset(): void {
        this.itemCreate = {
            crypto: null,
            amount: null,
            dateOfPurchase: null,
            location: null
        };
        this.$v.$reset()
    }

    submit() {
        console.log()
        console.log('submit!')
        this.$v.$touch()
        if (!this.$v.$invalid) {
            this.create();
            this.reset();
        }
    }

    updated(): void {
        console.log("updated");
    }

    mounted(): void {
        console.log("mounted");
        store.dispatch("getCryptoCurrencies");
    }
}
</script>
<style>
    .table td, .table th {
        text-align: center;
    }
</style>
