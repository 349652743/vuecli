<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <el-container>
      <el-header v-show="!($route.name==='register')">
        <!-- 使用 router-link 组件来导航. -->
        <!-- 通过传入 `to` 属性指定链接. -->
        <!-- <router-link> 默认会被渲染成一个 `<a>` 标签 -->
        <el-menu
        class="el-menu-demo" 
        mode="horizontal" 
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b">
          <el-menu-item index="2"><router-link to="/login">登录</router-link></el-menu-item>
          <el-menu-item index="3"><router-link to="/contest">比赛</router-link></el-menu-item>
          <el-menu-item index="1"><router-link to="/user">用户</router-link></el-menu-item>
        </el-menu>

      </el-header>
      <el-main>
        <!-- 路由出口 -->
        <!-- 路由匹配到的组件将渲染在这里 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
}
</script>
