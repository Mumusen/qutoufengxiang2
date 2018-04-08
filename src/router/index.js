import Vue from 'vue'
import Router from 'vue-router'

import Index from '@/components/Index'
import ConIndex from '@/components/indexComponents/ConIndex'

import Invest from '@/components/themeInvestment/Invest'
import InvestContent from '@/components/themeInvestment/InvestContent'
import ThemeSearch from '@/components/themeInvestment/ThemeSearch'


import Billboard from '@/components/billBoard/BillBoard'

import SelectStock from '@/components/selectStock/SelectStock'

import Information from '@/components/information/Information'

import About from '@/components/about/About'

import PersonCenter from '@/components/personCenter/PersonCenter'
import DepartmentFollow from '@/components/personCenter/DepartmentFollow'
import MyMessage from '@/components/personCenter/MyMessage'
import ModifyPassword from '@/components/personCenter/ModifyPassword'
import DownLoadApp from '@/components/personCenter/DownLoadApp'

import Register from '@/components/register/Register'
import Login from '@/components/login/Login'
import ForgetPassword from '@/components/forgetPassword/ForgetPassword'

import StockDetails from '@/components/StockDetails/StockDetails'
import ThemeDetails from '@/components/themeDetails/ThemeDetails'
import ArticleDetails from '@/components/newsDetails/NewsDetails'
import FuzzySearch from '@/components/fuzzySearch/FuzzySearch'

import DepartmentDetail from '@/components/departmentDetail/DepartmentDetail'
import HistoryDepartment from '@/components/departmentDetail/History'
import BusinessDetail from '@/components/departmentDetail/BusinessDetail'

import UserAgreements from '@/components/userAgreements/UserAgreements'
import NotFind from '@/components/404notfind/NotFind'
import UpBrowser from '@/components/upBrowser/UpBrowser'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '*',
      name: 'NotFind',

      component: NotFind
    },
    {
      path: '/',
      name: 'Index',
      redirect: '/conIndex',
      component: Index,
      children:[
        // 首页
        {
          path: '/conIndex',
          name: 'ConIndex',
          component: ConIndex
        },
        // 主题投资
        {
          path: '/invest',
          name: 'Invest',
          component: Invest,
          redirect: '/invest/investCon',
          children: [
            {
              path: '/invest/investCon',
              name: 'InvestContent',
              
              component: InvestContent,
            },
            {
              path: '/invest/themeSearch',
              name: 'ThemeSearch',
              component: ThemeSearch
            }
          ]
        },
        // 龙虎榜
        {
          path: '/billboard',
          name: 'Billboard',
          component: Billboard
        },
        // 自选股
        {
          path: '/select',
          name: 'SelectStock',
          component: SelectStock
        },
        // 资讯
        {
          path: '/information',
          name: 'Information',
          component: Information
        },
        // 关于我们
        {
          path: '/about',
          name: 'About',
          component: About
        },
        // 个人中心
        {
          path: '/personCenter',
          name: 'PersonCenter',
          component: PersonCenter,
          beforeEnter: (from,to,next) => {
            
            if(sessionStorage.getItem('qutouPhone') || localStorage.getItem('qutouPhone')){
              next();
            }else{
              next({
                path: '/login'
                // query: { redirect: to.fullPath }
              });
            }
            
          },
          redirect: '/personCenter/department',
          children: [
            {
              path: '/personCenter/department',
              name: 'DepartmentFollow',
              component: DepartmentFollow
            },
            {
              path: '/personCenter/message',
              name: 'MyMessage',
              component: MyMessage
            }
          ]
        },
        // 修改密码
        {
          path: '/modify',
          name: 'ModifyPassword',
          beforeEnter: (from,to,next) => {
            
            if(sessionStorage.getItem('qutouPhone') || localStorage.getItem('qutouPhone')){
              next();
            }else{
              next({
                path: '/login'
                // query: { redirect: to.fullPath }
              });
            }
            
          },
          component: ModifyPassword
        },
        // 下载
        {
          path: '/download',
          name: 'DownLoadApp',

          // beforeEnter: (from,to,next) => {
            
          //   if(sessionStorage.getItem('qutouPhone') || localStorage.getItem('qutouPhone')){
          //     next();
          //   }else{
          //     next({
          //       path: '/login'
          //       // query: { redirect: to.fullPath }
          //     });
          //   }
            
          // },
          component: DownLoadApp
        },
        // 注册
        {
          path: '/register',
          name: 'Register',
          component: Register
        },
        // 忘记密码
        {
          path: '/forget',
          name: 'ForgetPassword',
          component: ForgetPassword
        },
        // 个股详情
        {
          path: '/stockDetails',
          name: 'StockDetails',
          component: StockDetails
        },
        // 主题详情
        {
          path: '/themeDetails',
          name: 'ThemeDetails',
          component: ThemeDetails
        },
        // 文章详情
        {
          path: '/article',
          name: 'ArticleDetails',
          component: ArticleDetails
        },
        // 模糊搜索
        {
          path: '/fsearch',
          name: 'FuzzySearch',
          component: FuzzySearch
        },
        // 营业部详情
        {
          path: '/departmentDetail',
          name: 'DepartmentDetail',
          // beforeEnter: (from,to,next) => {
            
          //   if(sessionStorage.getItem('qutouPhone') || localStorage.getItem('qutouPhone')){
          //     next();
          //   }else{
          //     next({
          //       path: '/conIndex'
          //       // query: { redirect: to.fullPath }
          //     });
          //   }
            
          // },
          component: DepartmentDetail,
          redirect: '/departmentDetail/history',
          children: [  // BusinessDetail
            {
              path: '/departmentDetail/history',
              name: 'History',
              component: HistoryDepartment
            },
            {
              path: '/departmentDetail/business',
              name: 'BusinessDetail',
              component: BusinessDetail
            }
            
          ]
        },
        // 用户协议
        {
          path: 'agreements',
          name: 'UserAgreements',
          component: UserAgreements
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      beforeEnter: (from,to,next) => {
            
        if(sessionStorage.getItem('qutouPhone') || localStorage.getItem('qutouPhone')){
          next({
            path: '/conIndex'
          });
        }else{
          next();
        }
        
      },
      component: Login,
      
    },
    {
      path: '/upgrade',
      name: 'UpBrowser',
      component: UpBrowser
    }
  ]
})
