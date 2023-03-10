import Vue from 'vue'
import App from './App.vue'
import VueApexCharts from 'vue-apexcharts'
import '/src/assets/styles/styles.scss'

Vue.config.productionTip = false

Vue.use(VueApexCharts)
Vue.component('apexchart', VueApexCharts)

new Vue({
  render: (h) => h(App)
}).$mount('#app')
