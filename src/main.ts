import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import store from './store'
import 'jquery';
import 'popper.js';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import 'font-awesome/css/font-awesome.min.css';
Vue.config.productionTip = false
Vue.use(Vuelidate)

new Vue({
    store,
    render: h => h(App)
}).$mount('#app')
