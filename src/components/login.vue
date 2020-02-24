<template>
  <el-container>
    <el-main>
    <el-row type="flex" class="row-bg" justify="center">
      <h2>欢迎登录</h2>
    </el-row>
    <el-row type="flex" class="row-bg" justify="center">
          <el-col :span="7">
            <label>账号：</label>
            <el-input v-model="username" placeholder="请输入账号"></el-input>
          </el-col>
    </el-row>
    <br>
    <el-row type="flex" class="row-bg" justify="center">
      <el-col :span="7">
        <label>密码：</label>
        <el-input v-model="password" placeholder="请输入密码" show-password></el-input>
      </el-col>
    </el-row>
    <br>
    <el-row type="flex" class="row-bg" justify="center" :gutter="40">
      <el-col :span="3">
        <el-button type="warning" v-on:click="reset" style="width:100%">重置</el-button>
      </el-col>
      <el-col :span="1">
        
      </el-col>
      <el-col :span="3">
        <el-button type="primary" v-on:click="submit" style="width:100%">登录</el-button>
      </el-col>
    </el-row>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: 'HelloWorld',
  data(){
    return {
      url:'http://127.0.0.1:3000',
      username:'',
      password:''
    }
  },
  methods:{
    reset:function(){
      this.username='';
      this.password='';
    },
    submit:function(){
      var data = {
        username:this.username,
        password:this.password
      }
      var _this = this;
      
      this.$http.post(this.url+'/api/login',data,{emulateJSON:true}).then(function(res){
          _this.$store.commit('setToken',res.body.token);
          _this.$message({message:"登陆成功",type:'success'});
          _this.$router.push({path:'/contest'});
      },function(res){
        console.log(res.status);
      });
      
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
