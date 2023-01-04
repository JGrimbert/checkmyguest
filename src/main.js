import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue, IconsPlugin, BIcon } from 'bootstrap-vue';

import VueApexCharts from 'vue-apexcharts'



import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import '/src/assets/styles.scss';


Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

Vue.use(VueApexCharts)
Vue.component('apexchart', VueApexCharts)

Vue.component('BIcon', BIcon);

new Vue({
  render: h => h(App),
}).$mount('#app')

