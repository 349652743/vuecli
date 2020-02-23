<template>
  <el-container>
    <el-header>
        <el-row type="flex" class="row-bg " justify="center">
         
        <h1>{{this.$route.query.contestName}}<small>报名页面</small></h1>
        
        </el-row>
    </el-header>
    <br>
    <el-main>
    <el-row type="flex" class="row-bg " justify="center">
        <el-col :span="20">
            <hr style="border:1px dashed #0000fff"/>
        </el-col>
    </el-row>
    <el-row type="flex" class="row-bg " justify="center">
        <el-col :span="20">
            <el-alert
                title="Warning"
                type="warning"
                description="请保证所填信息准确，信息错误者将没有参赛资格"
                show-icon>
            </el-alert>
        </el-col>
    </el-row>
    <br>
    <!-- 表单 -->
    <el-row type="flex" class="row-bg" justify="center" :gutter="20">
      <el-col :span="6">
          <label>学号：</label>
          <el-input v-model="user.studentId" placeholder="请输入账号"></el-input>
      </el-col>
      <el-col :span="6">
          <label>姓名：</label>
          <el-input v-model="user.name" placeholder="请输入账号"></el-input>
      </el-col>
      <el-col :span="6">
          <label>性别：</label>
          <el-select v-model="user.sex" placeholder="请选择" style="width:100%;">
              <el-option
              v-for="item in sexOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
              </el-option>
          </el-select>
      </el-col>
    </el-row>
    <br>
    <el-row type="flex" class="row-bg" justify="center">
      <el-col :span="18">
        <label>学院：</label>
        <el-select v-model="user.department" placeholder="请选择" style="width:100%;">
                <el-option
                v-for="item in departmentOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select>
      </el-col>
    </el-row>

    <br>
    <el-row type="flex" class="row-bg " justify="center">
        <el-col :span="20">
            <hr style="border:1px solid #0000fff"/>
        </el-col>
    </el-row>
    <br>
    <el-row type="flex" class="row-bg" justify="space-around" :gutter="40">
      <el-col :span="4">
        <el-button type="primary" @click="submit" style="width:100%;" v-show="!openquery">提交</el-button>
        <el-button type="primary" @click="query" style="width:100%;" v-show="openquery">查询</el-button>
      </el-col>
      <el-col :span="4">
        <el-button type="warning" @click="dialogVisible = true" style="width:100%;">Tips</el-button>
      </el-col>
    </el-row>
    <el-dialog
    title="比赛环境"
    :visible.sync="dialogVisible"
    width="30%"
    :before-close="handleClose">
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
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
    </span>
    </el-dialog>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: 'register',
  data(){
    return {
        sexOptions: [{
          value: '男',
          label: '男'
        }, {
          value: '女',
          label: '女'
        }],
        departmentOptions: [{
          value: '计算机科学技术学院',
          label: '计算机科学技术学院'
        }, {
          value: '人工智能学院',
          label: '人工智能学院'
        }],
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
        dialogVisible:false,
        openquery:true,
    }
  },
  mounted(){
    var data = {contest:this.user};
    var _this = this;
    this.$http.post('http://127.0.0.1:3000/api/queryContest',data,{emulateJSON:true}).then(function(res){
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
    submit:function(){
    //ajax 注册用户
      if(this.user.name!=''&&this.user.sex!=''&&this.user.department!=''&&this.user.studentId!=''){//表单验证
        var data = {user:this.user};
        this.$http.post('http://127.0.0.1:3000/api/addUser',data,{emulateJSON:true}).then(function(res){
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
    query:function(){
      //ajax 查询用户
      var data = {user:this.user};
      this.$http.post('http://127.0.0.1:3000/api/queryUser',data,{emulateJSON:true}).then(function(res){
        console.log(res.body.status);
        if(res.body.status===200){
            this.$alert(`账号:${res.body.user.username}密码${res.body.user.password}`, '请谨慎保存账号密码', {
            confirmButtonText: '确定'
          });
        }
      },function(res){
          console.log(res.status);
      });
    }
  }
}
</script>
<style type="text/css">
h1 {font-size:40px;}
h2 {font-size:40px;}
p {font-size:14px;}
</style>
<!-- Add "scoped" attribute to limit CSS to this component only -->
