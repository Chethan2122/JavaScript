import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import searchElement from '@/components/searchElement.vue'

Vue.config.productionTip = false
Vue.filter('pipes', function (value) {
  if (value.length>10){
    const item = value.slice(0,10)+'..'
    return item
  }
  else{
    return value
  }
  
})
Vue.component('searchElement',searchElement)


Vue.directive('comma', {
  componentUpdated(el, binding,vnode) {
    console.log(binding.value)
    binding.value = binding.value.replace(/\D/g, "")
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    console.log(binding.value)
    vnode.context.input.id = binding.value
  }
}),

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
