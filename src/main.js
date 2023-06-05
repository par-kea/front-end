import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import Vuetify from "vuetify";
import router from './router'
import "./bootstrap";
import Notifications from "vue-notification";
import ECharts from 'vue-echarts'
import { use } from 'echarts/core'
import "vuetify/dist/vuetify.min.css";
import es from "vuetify/es5/locale/es";
import * as VueGoogleMaps from "vue2-google-maps";


Vue.use(Notifications);
Vue.use(Vuetify)
Vue.component('v-chart', ECharts)

// import ECharts modules manually to reduce bundle size
import {
  CanvasRenderer
} from 'echarts/renderers'
import {
  BarChart
} from 'echarts/charts'
import {
  GridComponent,
  TooltipComponent
} from 'echarts/components'

use([
  CanvasRenderer,
  BarChart,
  GridComponent,
  TooltipComponent
]);

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyDfIz2DiYY8FDAh0s3ivqj1bAGKgYVAJmM",
    libraries: "places"
  }
});


Vue.config.productionTip = false

new Vue({
  router,
  vuetify: new Vuetify({
    icons: {
      iconfont: "mdi"
    },
    lang: {
      locales: { es },
      current: "es"
    }
  }),
  render: h => h(App)
}).$mount('#app')
