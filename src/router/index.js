import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import SliderDel from '@/components/SliderDel/Index'
import Picker from '@/components/Picker/Index'
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
      path: '/sliderDel',
      name: 'SliderDel',
      component: SliderDel
    },
    {
      path: '/picker',
      name: 'Picker',
      component: Picker
    },
    {
      path: '/date/picker',
      name: 'DatePicker',
      component: DatePicker
    }
  ]
})
