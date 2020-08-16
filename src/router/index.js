import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/views/Dashboard'
import BadGateway from '@/views/BadGateway'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [{
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      props: {
        page: 1
      },
      alias: '/'
    },
    {
      path: '/504',
      name: 'BadGateway',
      props: {
        page: 2
      },
      component: BadGateway
    },
    {
      path: '/404',
      name: 'BadGateway',
      props: {
        page: 2
      },
      component: BadGateway
    },
    {
      path: '*',
      props: {
        page: 2
      },
      redirect: '/404'
    }
  ]
})
