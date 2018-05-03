import Vue from 'vue'
import Router from 'vue-router'

import User from '@/pages/user/User'
import Slider from '@/components/Slider'
import Login from '@/pages/user/Login'
import FindPwd from '@/pages/user/FindPwd'
import FindPinCode from '@/pages/user/FindPinCode'
import Regist from '@/pages/user/Regist'


import Account from '@/pages/account/Account'
import IdentityVerify from '@/pages/account/IdentityVerify'
import Security from '@/pages/account/Security'


import Property from '@/pages/property/Property'
import CoinOption from '@/pages/property/CoinOption'
import FinancialRecords from '@/pages/property/FinancialRecords'
import WithDrawAddressManagement from '@/pages/property/WithDrawAddressManagement'

import Main from '@/pages/Main'
import Home from '@/pages/Home'
import CoinExchange from '@/pages/exchange/CoinExchange'

import OrderList from '@/pages/order/OrderList'

Vue.use(Router)

const router =  new Router({
  mode:"history",
  routes: [
    // login
    {
      path: '/',
      component: Main,
      children:[
        {
          path: '',
          component: Home
        },
        {
          path: 'home',
          name: 'home',
          component: Home
        },
        {
          path: 'property',
          name: 'property',
          component: Property,
          children:[
            {
              path: 'coinoption',
              component: CoinOption
            },
            {
              path: 'coinoption/:dealId/:type',
              name:'coinoption',
              component: CoinOption
            },
            {
              path: 'financialrecords',
              name: 'financialrecords',
              component: FinancialRecords
            },
            {
              path: 'withdrawaddressmanagement',
              name: 'withdrawaddressmanagement',
              component:WithDrawAddressManagement
            }
          ]
        },
        {
          path: 'account',
          name: 'account',
          component: Account,
          children:[
            {
              path: '',
              component: Security
            },
            {
              // 实名认证
              path: 'identityverify',
              name: 'identityverify',
              component: IdentityVerify
            },
            {
              // 个人中心
              path: 'security',
              name: 'security',
              component: Security
            }
          ]
        },
        {
          path: 'user',
          name: 'user',
          component: User,
          children:[
            {
              // 注册
              path: 'regist',
              name: 'regist',
              component: Regist
            },
            {
              // 登录
              path: 'login',
              name: 'login',
              component: Login
            },
            {
              // 找回/修改登录密码
              path: 'findpassword/:type/',
              name: 'findpassword',
              component: FindPwd
            },
            {
              // 找回/修改登录密码
              path: 'findpincode',
              name: 'findpincode',
              component: FindPinCode
            }
          ]
        },
        {
          // 交易面板
          path: 'exchange/coinexchange',
          name: 'coinexchange',
          component: CoinExchange
        },
        {
          // 订单页面
          path:'order',
          name:'order',
          component: OrderList
        }
      ]
    }
  ]
})
export default router
