<template>

    <el-container>
        <el-aside width="150px">
            <el-menu
            default-active="2"
            class="el-menu-vertical-demo"
            v-for="(contest,index) of contestlist"
            :key="index"
            >
            <el-menu-item index="index">
                <span slot="title" @click="selectUser(index)">{{contest.contestName}}</span>
            </el-menu-item>
            </el-menu>
        </el-aside>
        <el-main>
            <el-button type="primary" @click="addDialogVisible=true">添加用户</el-button>
            
            <el-table  :data="contestlist[tmpcontest].userlist" style="width: 100%">
                <el-table-column prop="id" label="编号" width="180" header-align="center" align="center">
                </el-table-column>
                <el-table-column prop="name" label="姓名" width="180" header-align="center" align="center">
                </el-table-column>
                <el-table-column prop="studentId" label="学号" header-align="center" align="center">
                </el-table-column>
                <el-table-column prop="sex" label="性别" header-align="center" align="center">
                </el-table-column>
                <el-table-column prop="department" label="学院" header-align="center" align="center">
                </el-table-column>
                <el-table-column prop="username" label="账号" header-align="center" align="center">
                </el-table-column>
                <el-table-column prop="password" label="密码" header-align="center" align="center">
                </el-table-column>
                <el-table-column label="已查询" width="180" header-align="center" align="center">
                    <template slot-scope="scope">
                        <el-switch
                        v-model="scope.row.haveQueried"
                        active-color="#13ce66"
                        inactive-color="#ff4949"
                        @change="editstatus(scope.row)"
                        >
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="180" header-align="center" align="center">
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        @click="edituser(scope.row)">编辑</el-button>
                        <el-button
                        size="mini"
                        type="danger"
                        @click="deletingUser.id=scope.row.id;deleteDialogVisible=true;">删除</el-button>
                    </template>
                </el-table-column>
                </el-table>
                <!-- 用户修改对话框 -->
                <el-dialog title="用户修改" :visible.sync="editDialogVisible" width="40%">
                    <el-row type="flex" class="row-bg" >
                        <el-col :span="4"><p>姓名: </p></el-col>
                        <el-col :span="10">
                            <el-input v-model="editingUser.name" placeholder="请输入账号"></el-input>
                        </el-col>
                    </el-row>
                    <el-row type="flex" class="row-bg" >
                        <el-col :span="4"><p>学号: </p></el-col>
                        <el-col :span="10">
                            <el-input v-model="editingUser.studentId" placeholder="请输入账号"></el-input>
                        </el-col>
                    </el-row>
                    <el-row type="flex" class="row-bg" >
                        <el-col :span="4"><p>性别: </p></el-col>
                        <el-col :span="10">
                            <el-input v-model="editingUser.sex" placeholder="请输入账号"></el-input>
                        </el-col>
                    </el-row>
                    <el-row type="flex" class="row-bg" >
                        <el-col :span="4"><p>学院: </p></el-col>
                        <el-col :span="10">
                            <el-input v-model="editingUser.department" placeholder="请输入账号"></el-input>
                        </el-col>
                    </el-row>
                    <el-row type="flex" class="row-bg" >
                        <el-col :span="4"><p>账号: </p></el-col>
                        <el-col :span="10">
                            <el-input v-model="editingUser.username" placeholder="请输入账号"></el-input>
                        </el-col>
                    </el-row>
                    <el-row type="flex" class="row-bg" >
                        <el-col :span="4"><p>密码: </p></el-col>
                        <el-col :span="10">
                            <el-input v-model="editingUser.password" placeholder="请输入账号"></el-input>
                        </el-col>
                    </el-row>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="editDialogVisible = false">取 消</el-button>
                        <el-button type="primary" @click="submituser">确 定</el-button>
                    </div>
                </el-dialog>
                <!-- 删除用户对话框 -->
                <el-dialog
                title="提示"
                :visible.sync="deleteDialogVisible"
                width="30%"
                center>
                <span>确定要删除此用户吗？</span>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="deleteDialogVisible = false">取 消</el-button>
                    <el-button type="danger" @click="deleteuser">确 定</el-button>
                </span>
                </el-dialog>
                <!-- 添加用户对话框 -->
                <el-dialog title="用户添加" :visible.sync="addDialogVisible" width="40%">
                    <el-row type="flex" class="row-bg" >
                        <el-col :span="4"><p>姓名: </p></el-col>
                        <el-col :span="10">
                            <el-input v-model="addinguser.name" placeholder="请输入账号"></el-input>
                        </el-col>
                    </el-row>
                    <el-row type="flex" class="row-bg" >
                        <el-col :span="4"><p>学号: </p></el-col>
                        <el-col :span="10">
                            <el-input v-model="addinguser.studentId" placeholder="请输入账号"></el-input>
                        </el-col>
                    </el-row>
                    <el-row type="flex" class="row-bg" >
                        <el-col :span="4"><p>性别: </p></el-col>
                        <el-col :span="10">
                            <el-input v-model="addinguser.sex" placeholder="请输入账号"></el-input>
                        </el-col>
                    </el-row>
                    <el-row type="flex" class="row-bg" >
                        <el-col :span="4"><p>学院: </p></el-col>
                        <el-col :span="10">
                            <el-input v-model="addinguser.department" placeholder="请输入账号"></el-input>
                        </el-col>
                    </el-row>
                    <el-row type="flex" class="row-bg" >
                        <el-col :span="4"><p>账号: </p></el-col>
                        <el-col :span="10">
                            <el-input v-model="addinguser.username" placeholder="请输入账号"></el-input>
                        </el-col>
                    </el-row>
                    <el-row type="flex" class="row-bg" >
                        <el-col :span="4"><p>密码: </p></el-col>
                        <el-col :span="10">
                            <el-input v-model="addinguser.password" placeholder="请输入账号"></el-input>
                        </el-col>
                    </el-row>
                    <el-row type="flex" class="row-bg" >
                        <el-col :span="4"><p>比赛编号: </p></el-col>
                        <el-col :span="10">
                            <el-input v-model="addinguser.contestId" placeholder="请输入账号"></el-input>
                        </el-col>
                    </el-row>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="addDialogVisible = false">取 消</el-button>
                        <el-button type="primary" @click="adduser">确 定</el-button>
                    </div>
                </el-dialog>
        </el-main>
        
    </el-container>

    
</template>
<script>
    var data = {
        contestlist:[{
            userlist:[]
        }],
        addDialogVisible:false,
        editDialogVisible:false,
        deleteDialogVisible:false,
        tmpcontest:0,
        editingUser:{
            id:1,
            name:'王宁',
            sex:'男',
            studentId:1,
            department:'计算机科学技术学院',
            username:'',
            password:'',
            contestId:''
        },
        deletingUser:{
            id:null,
        },
        addinguser:{
            name:'王宁',
            sex:'男',
            studentId:1,
            department:'计算机科学技术学院',
            username:'',
            password:'',
            haveQueried:false,
            contestId:''
        }
    };
export default {
    name: 'user',
    data(){
        return data;
    },
    mounted(){
        var data = {token:this.$store.state.token};
        this.$http.post('http://127.0.0.1:3000/api/getUser',data,{emulateJSON:true}).then(function(res){
            console.log(res.body.status);
            if(res.body.status===200){
                this.contestlist = res.body.contestlist;
                this.$message("获取比赛成功");
            }else {
                this.$message("获取比赛失败,请重新登录");
            }
        },function(res){
            console.log(res.status);
        });
    },
    methods:{
        selectUser(index){
            this.tmpcontest = index;
        },
        edituser(row) {
            this.editDialogVisible = true;
            this.editingUser = {
                id:row.id,
                name:row.name,
                sex:row.sex,
                studentId:row.studentId,
                department:row.department,
                username:row.username,
                password:row.password,
                contestId:row.contestId,
            }
            
        },
        submituser(){
            //ajax //后台修改用户
            var data = {user:this.editingUser,token:this.$store.state.token};
            var _this = this;
            this.$http.post('http://127.0.0.1:3000/api/editUser',data,{emulateJSON:true}).then(function(res){
                console.log(res.body.status);
                if(res.body.status===200){
                    this.$message("修改成功");
                    // 前台修改比赛
                    for(var i=0;i<_this.contestlist.length;i++){
                        for(var j=0;j<_this.contestlist[i].userlist.length;j++){
                            if(_this.contestlist[i].userlist[j].id===_this.editingUser.id)
                            for(var item in _this.contestlist[i].userlist[j]){
                                _this.contestlist[i].userlist[j][item] = _this.editingUser[item];
                            }
                        }
                    }
                }else {
                    this.$message("添加失败");
                }
            },function(res){
                console.log(res.status);
            });
            this.editDialogVisible = false;
        },
        deleteuser() {
            //前端删除用户
            for(var i=0;i<this.contestlist.length;i++){
                for(var j=0;j<this.contestlist[i].userlist.length;j++){
                    // console.log(this.contestlist[i].id);
                    // console.log(this.deletingContest.id);
                    if(this.contestlist[i].userlist[j].id===this.deletingUser.id){
                        this.contestlist[i].userlist.splice(j,1);
                    }
                }
            }
            //ajax 后台删除用户
            console.log(this.deletingUser);
            var data = {user:this.deletingUser,token:this.$store.state.token};
            this.$http.post('http://127.0.0.1:3000/api/deleteUser',data,{emulateJSON:true}).then(function(res){
                console.log(res.body.status);
                if(res.body.status===200){
                    this.$message("删除成功");
                }else {
                    this.$message("删除失败");
                }
            },function(res){
                console.log(res.status);
            });
            this.deleteDialogVisible = false;
        },
        editstatus(row){
            //ajax 后台修改用户状态
            var data = {user:{id:row.id,haveQueried:row.haveQueried},token:this.$store.state.token};
            this.$http.post('http://127.0.0.1:3000/api/editUserStatus',data,{emulateJSON:true}).then(function(res){
                console.log(res.body.status);
                if(res.body.status===200){
                    this.$message("修改成功");
                }else {
                    this.$message("添加失败");
                }
            },function(res){
                console.log(res.status);
            });

        },
        adduser(){
            var data = {user:this.addinguser,token:this.$store.state.token};
            var _this = this;
            this.$http.post('http://127.0.0.1:3000/api/addUser',data,{emulateJSON:true}).then(function(res){
                     console.log(res.body.status);
                    if(res.body.status===200){
                        for(var i=0;i<_this.contestlist.length;i++){
                            console.log(_this.contestlist[i].id);
                            console.log(_this.addinguser.contestId);
                            if(_this.contestlist[i].id==_this.addinguser.contestId){
                                console.log(333);
                                var newUser = {
                                    name:_this.addinguser.name,
                                    sex:_this.addinguser.sex,
                                    studentId:_this.addinguser.studentId,
                                    department:_this.addinguser.department,
                                    username:_this.addinguser.username,
                                    password:_this.addinguser.password,
                                    haveQueried:_this.addinguser.haveQueried,
                                    contestId:_this.addinguser.contestId,
                                    id:res.body.id
                                }
                                _this.contestlist[i].userlist.push(newUser);
                            }
                        }
                        this.$message("添加成功");
                    }
                },function(res){
                    console.log(res.status);
                });
            this.addDialogVisible = false;

        }

    }
}
</script>