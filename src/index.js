import Vue from 'vue'
import App from '@/App'
import router from '@/router'
import 'normalize.css'

// eslint-disable-next-line
new Vue({
  el: '#root',
  router,
  render: h => h(App)
})
