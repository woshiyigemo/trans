import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Slider from '@/components/Slider'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Slider',
      component: Slider
    }
  ]
})
