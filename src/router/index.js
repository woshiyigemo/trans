import Vue from 'vue'
import Router from 'vue-router'
import User from '@/pages/user/User'
import Slider from '@/components/Slider'
import Login from '@/pages/user/Login'
import FindPwd from '@/pages/user/FindPwd'
import Regist from '@/pages/user/Regist'

import Property from '@/pages/property/Property'
import CoinOption from '@/pages/property/CoinOption'
import OrderList from '@/pages/property/OrderList'

import Main from '@/pages/Main'
import Home from '@/pages/Home'
import CoinExchange from '@/pages/exchange/CoinExchange'
Vue.use(Router)

export default new Router({
  routes: [
    // login
    {
      path: '/',
      name: 'Main',
      component: Main,
      children:[
        {
          path: '',
          component: Home
        },
        {
          path: 'home',
          name: 'Home',
          component: Home
        },
        {
          path: 'property',
          name: 'Property',
          component: Property,
          children:[
            {
              path: 'coinoption',
              name: 'CoinOption',
              component: CoinOption
            },
            {
              path: 'orderlist',
              name: 'OrderList',
              component: OrderList
            }
          ]
        },
        {
          path: 'user',
          name: 'User',
          component: User,
          children:[
            {
              path: 'regist',
              name: 'Regist',
              component: Regist
            },
            {
              path: 'login',
              name: 'Login',
              component: Login
            }
          ]
        },
        {
          path: 'findpassword',
          name: 'FindPwd',
          component: FindPwd
        },
        {
          path: 'exchange/coinexchange',
          name: 'CoinExchange',
          component: CoinExchange
        }
      ]
    }
  ]
})
