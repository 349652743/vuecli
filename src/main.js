import Vue from 'vue'
import App from './App.vue'
import store from './stores/store.js'
import router from './routers/router.js'
import VueResource from 'vue-resource'
import elementui from 'element-ui'
import antd from 'antd'

Vue.use(antd);
Vue.use(elementui);
Vue.use(VueResource);
Vue.config.productionTip = false

router.beforeEach((to, from, next) => { //路由拦截
  if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
      if (store.state.token) {  // 通过vuex state获取当前的token是否存在
          next();
      }
      else {
          next({
              path: '/login',
              query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
          })
      }
  }
  else {
      next();
  }
})

new Vue({
  router,//路由注册在app.vue上
   store,//store注册在app.vue上
  render: h => h(App),
}).$mount('#app')
