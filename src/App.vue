<template>
    <div>
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark static-top mb-5">
            <div>
                <a class="navbar-brand font-weight-bold" href="#">
                    <img alt="Vue logo" class="mx-3" width="60" src="./assets/logo.png">
                          Mindly Crypto Portfolio
                </a>
            </div>
        </nav>
        <table class="table table-hover container">
            <PortfolioCreate/>
            <Portfolio/>
        </table>
    </div>
</template>

<script>
import { Component, Vue } from "vue-property-decorator";
import Portfolio from '@/views/Portfolio.vue'
import PortfolioCreate from "@/views/PortfolioCreate";

@Component({
    components: {
        PortfolioCreate,
        Portfolio
    }
})
export default class App extends Vue {}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
