<template>
  <a-layout>
    <br>
    <a-layout-content style=" min-height: 600px;">
    <a-row type="flex" class="row-bg " justify="center">
      <h1>{{this.$route.query.contestName}}<small>报名页面</small></h1>
    </a-row>
    <a-row type="flex" class="row-bg " justify="center">
      <a-col span="20">
        <a-divider ></a-divider>
      </a-col>
    </a-row>
    <a-row type="flex" class="row-bg " justify="center">
      <a-col :span="20">
        <a-alert
          message="Warning"
          description="请保证所填信息准确，信息错误者将没有参赛资格"
          banner
          type="warning"
          showIcon
          size="large"
          />
      </a-col>
    </a-row>
    <br>
    <!-- 表单 -->
    <a-row type="flex" class="row-bg" justify="center" :gutter ="20">
      <a-col :span="10" >
          <label>学号：</label>
          <a-input v-model="user.studentId" placeholder="请输入学号" style="width:100%;" size="large"></a-input>
      </a-col>
      <a-col :span="10" >
          <label>姓名：</label>
          <a-input v-model="user.name" placeholder="请输入姓名" style="width:100%;" size="large"></a-input>
      </a-col>
      
    </a-row>
    <br>
    <a-row type="flex" class="row-bg" justify="center" :gutter="20">
      <a-col :span="10" >
          <label>性别：</label>
          <a-select defaultValue="" @change="sexChange" style="width:100%" size="large">
            <a-select-option value="男">男</a-select-option>
            <a-select-option value="女">女</a-select-option>
          </a-select>
      </a-col>
      <a-col :span="10">
        <label>学院：</label>
        <a-select defaultValue="" style="width:100%" @change="departmentChange" size="large">
          <a-select-option v-for="item of departmentlist" :key="item">{{item}}</a-select-option>
          <a-select-option value="disabled" disabled>如果没有你的学院请联系管理员</a-select-option>
        </a-select>
      </a-col>
    </a-row>

    <br>
    <a-row type="flex" class="row-bg " justify="center">
        <a-col :span="20">
             <a-divider ></a-divider>
        </a-col>
    </a-row>
    <br>
    <a-row type="flex" class="row-bg" justify="space-around" :gutter="20" >
      <a-col :span='7'>
        <a-button type="primary" @click="submit"  v-show="!openquery" style="width:100%" size="large">提交</a-button>
        <a-button type="primary" @click="query"  v-show="openquery" style="width:100%" size="large">查询</a-button>
      </a-col>
      <a-col :span='7'>
        <a-button type="warning" @click="dialogVisible = true" style="width:100%" size="large">Tips</a-button>
      </a-col>
    </a-row>
    <a-modal
    title="比赛环境"
    :visible="dialogVisible"
    width="80%">
    <span>
    <!--p>语言：C C++ Java Python Javascript Scheme</p-->
        <p>语言： C C++ Java Python2/3 JavaScript Kotlin Scala</p>
        <p>C环境：gcc 5.4</p>
        <p>C++环境：g++ 5.4</p>
        <p>Java环境：OpenJDK 1.8</p>
        <p>Python环境：Python 2.7/3.5</p>
        <p>JavaScript环境：Node 8.16.1</p>
        <p>Kotlin环境：Kotlin 1.3.50</p>
        <p>Scala环境：Scala 2.13.0</p>
    </span>
    <span slot="footer" class="dialog-footer">
        <a-button type="primary" @click="dialogVisible = false">确 定</a-button>
    </span>
    </a-modal>
    </a-layout-content>
  </a-layout>
</template>

<script>
export default {
  name: 'register',
  data(){
    return {
      user:{
          name:'',
          sex:'',
          studentId:'',
          department:'',
          username:'',
          password:'',
          haveQueried:true,
          contestId:this.$route.query.id
      },
      departmentlist:["理学院","光电工程学院","机电工程学院","电子信息工程学院","计算机科学技术学院","材料科学与工程学院","化学与环境工程学院","生命科学学院","经济管理学院外语学院","文学院法学院","马克思主义学院","应用技术学院","东北师范大学","长春工业大学"],
      dialogVisible:false,
      openquery:true,
    }
  },
  mounted(){
    var data = {contest:this.user};
    var _this = this;
    this.$http.post(this.$store.state.url+'/api/queryContest',data,{emulateJSON:true}).then(function(res){
      console.log(res.body.status);
      if(res.body.status===200){
        if(res.body.contest.openRegister==true){
          _this.openquery=false;
        }else _this.openquery=true;
      }
    },function(res){
        console.log(res.status);
    });
  },
  methods:{
    submit(){
    //ajax 注册用户
      console.log(this.user);
      if(this.user.name!=''&&this.user.sex!=''&&this.user.department!=''&&this.user.studentId!=''){//表单验证
        var data = {user:this.user};
        this.$http.post(this.$store.state.url+'/api/addUser',data,{emulateJSON:true}).then(function(res){
          console.log(res.body.status);
          if(res.body.status===200){
            this.$message({message:"注册成功",type:'success'});
          }else {
            this.$message.error(res.body.message);
          }
        },function(res){
            console.log(res.status);
        });
      }else this.$message({message:"请填写完整信息",type:'warning'});
    },
    query(){
      //ajax 查询用户
      var data = {user:this.user};
      this.$http.post(this.$store.state.url+'/api/queryUser',data,{emulateJSON:true}).then(function(res){
        console.log(res.body.status);
        if(res.body.status===200){
            this.$alert(`账号:${res.body.user.username} 密码:${res.body.user.password} 座位号:${res.body.user.seatNumber}`, '请谨慎保存账号密码', {
            confirmButtonText: '确定'
          });
        }else {
          this.$message.error(res.body.message);
        }
      },function(res){
          console.log(res.status);
      });
    },
    sexChange(value){
      this.user.sex = value;
    },
    departmentChange(value){
      this.user.department = value;
    }
  }
}
</script>
<style type="text/css">
h1 {font-size:35px;}
h2 {font-size:40px;}
p {font-size:14px;}
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
