import Vue from 'vue'
import VueRouter from 'vue-router'
// 0. 如果使用模块化机制编程，导入 Vue 和 VueRouter，要调用 Vue.use(VueRouter)
// 1. 定义（路由）组件。
// 可以从其他文件 import 进来
import user from '../components/user.vue'
import login from '../components/login.vue'
import contest from '../components/contest.vue'
import register from '../components/register.vue'

Vue.use(VueRouter);



// 2. 定义路由
// 每个路由应该映射一个组件。 其中"component" 可以是
// 通过 Vue.extend() 创建的组件构造器，
// 或者，只是一个组件配置对象。
const routes = [
    { 
        path: '/user',
        name:'user',
        component: user,
        meta:{
            requireAuth: true
        }
    },
    { 
        path: '/login',
        name:'login',
        component: login
    },
    { 
        path: '/contest',
        name:'contest',
        component: contest,
        meta:{
            requireAuth: true
        }
    },
    { 
        path: '/register',
        name:'register',
        component: register
    },
]


// 3. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。
const router = new VueRouter({
  routes // （缩写）相当于 routes: routes
})

export default router;
// 4. 创建和挂载根实例。
// 记得要通过 router 配置参数注入路由，
// 从而让整个应用都有路由功能