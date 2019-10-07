import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import vuetify from './plugins/vuetify'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'

(function () {
  console.log('CORS Anywhere enabled!')

  var host = 'cors-anywhere.herokuapp.com'
  var url = 'https://' + host + '/'
  var slice = [].slice
  var origin = window.location.protocol + '//' + window.location.host
  var open = XMLHttpRequest.prototype.open
  XMLHttpRequest.prototype.open = function () {
    var args = slice.call(arguments)
    // eslint-disable-next-line no-useless-escape
    var targetOrigin = /^https?:\/\/([^\/]+)/i.exec(args[1])
    if (targetOrigin && targetOrigin[0].toLowerCase() !== origin &&
      targetOrigin[1] !== host) {
      args[1] = url + args[1]
    }
    return open.apply(this, args)
  }
})()

Vue.config.productionTip = false

new Vue({
  vuetify,
  render: h => h(App)
}).$mount('#app')
