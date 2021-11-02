import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import Dashboard from './components/Dashboard.vue'
import BaseSpinner from './components/BaseSpinner.vue'
import BaseDialog from './components/BaseDialog.vue'
Vue.config.productionTip = false
Vue.component('dashboard',Dashboard)
Vue.component('base-spinner',BaseSpinner)
Vue.component('base-dialog',BaseDialog)
new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')


