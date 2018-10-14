import VueRouter from 'vue-router'
import Vue from 'vue'
import MainArea from '@/components/MainArea'
import SensorInput from '@/components/task-2/SensorInput'
import Cameras from '@/components/task-3/Cameras'

Vue.use(VueRouter)

const routes = [
  { path: '/', component: MainArea },
  { path: '/task-2', component: SensorInput },
  { path: '/task-3', component: Cameras }
]

const router = new VueRouter({
  routes
})

export default router
