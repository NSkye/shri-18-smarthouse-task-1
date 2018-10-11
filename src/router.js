import VueRouter from 'vue-router'
import Vue from 'vue'
import MainArea from '@/components/MainArea'
import SensorInput from '@/components/task-2/SensorInput'

Vue.use(VueRouter)

const routes = [
  { path: '/', component: MainArea },
  { path: '/task-2', component: SensorInput }
]

const router = new VueRouter({
  routes
})

export default router
