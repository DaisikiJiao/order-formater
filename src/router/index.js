import Vue from 'vue'
import Router from 'vue-router'
import AddressParse from '@/components/AddressParse'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'AddressParse',
      component: AddressParse
    }
  ]
})
