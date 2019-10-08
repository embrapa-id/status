import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import vuetify from './plugins/vuetify'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'
import storage from 'vue-localstorage'

Vue.config.productionTip = false

Vue.use(storage)

Vue.use(storage, {
  name: 'ls',
  bind: true
})

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
