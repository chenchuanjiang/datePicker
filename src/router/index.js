import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import DatePicker from '@/components/DatePicker/Index'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/date/picker',
      name: 'DatePicker',
      component: DatePicker
    }
  ]
})
