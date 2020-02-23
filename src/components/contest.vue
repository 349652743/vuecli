<template>

    <el-container>
        <el-main>
            <el-button type="primary" @click="addDialogVisible=true">添加比赛</el-button>
            
            <el-table  :data="contestlist" style="width: 100%">
                <el-table-column prop="id" label="编号" width="180" header-align="center" align="center">
                </el-table-column>
                <el-table-column  label="名称" width="180" header-align="center" align="center">
                    <template slot-scope="scope">
                        <router-link :to="{ path: '/register', query: { id:scope.row.id ,contestName:scope.row.contestName}}">{{scope.row.contestName}}</router-link>
                    </template>
                </el-table-column>
                <el-table-column prop="endTime" label="结束时间" header-align="center" align="center">
                </el-table-column>
                <el-table-column label="状态" width="180" header-align="center" align="center">
                    <template slot-scope="scope">
                        <el-switch
                        v-model="scope.row.openRegister"
                        active-color="#13ce66"
                        inactive-color="#ff4949"
                        @change="editStatus(scope.row)"
                        >
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="180" header-align="center" align="center">
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        @click="editContest(scope.$index, scope.row)">编辑</el-button>
                        <el-button
                        size="mini"
                        type="danger"
                        @click="deletingContest.id=scope.row.id;deleteDialogVisible=true;">删除</el-button>
                    </template>
                </el-table-column>
                </el-table>
                <!-- 比赛修改对话框 -->
                <el-dialog title="比赛修改" :visible.sync="editDialogVisible" width="40%">
                    <el-row type="flex" class="row-bg" >
                        <el-col :span="4"><p>比赛名称: </p></el-col>
                        <el-col :span="10">
                            <el-input v-model="editingContest.contestName" placeholder="请输入账号"></el-input>
                        </el-col>
                    </el-row>
                    <br>
                    <el-row type="flex" class="row-bg" >
                        <el-col :span="4"><p>比赛时间: </p></el-col>
                        <el-col :span="10">
                            <el-date-picker
                                v-model="editingContest.endTime"
                                type="datetime"
                                placeholder="选择日期时间"
                                value-format="yyyy-MM-dd HH:mm:ss">

                            </el-date-picker>
                        </el-col>
                    </el-row>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="editDialogVisible = false">取 消</el-button>
                        <el-button type="primary" @click="submitContest">确 定</el-button>
                    </div>
                </el-dialog>
                <!-- 删除比赛对话框 -->
                <el-dialog
                title="提示"
                :visible.sync="deleteDialogVisible"
                width="30%"
                center>
                <span>确定要删除此比赛吗？</span>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="deleteDialogVisible = false">取 消</el-button>
                    <el-button type="danger" @click="deleteContest">确 定</el-button>
                </span>
                </el-dialog>
                <!-- 添加比赛对话框 -->
                <el-dialog title="比赛添加" :visible.sync="addDialogVisible" width="80%">
                    <el-row type="flex" class="row-bg" >
                        <el-col :span="4"><p>比赛名称: </p></el-col>
                        <el-col :span="10">
                            <el-input v-model="addingContest.contestName" placeholder="请输入账号"></el-input>
                        </el-col>
                    </el-row>
                    <br>
                    <el-row type="flex" class="row-bg" >
                        <el-col :span="4"><p>比赛时间: </p></el-col>
                        <el-col :span="10">
                            <el-date-picker
                                v-model="addingContest.endTime"
                                type="datetime"
                                placeholder="选择日期时间"
                                value-format="yyyy-MM-dd HH:mm:ss"
                                >
                            </el-date-picker>
                        </el-col>
                    </el-row>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="addDialogVisible = false">取 消</el-button>
                        <el-button type="primary" @click="addContest">确 定</el-button>
                    </div>
                </el-dialog>
        </el-main>
        
    </el-container>

    
</template>
<script>
    var data = {
        contestlist:[],
        addDialogVisible:false,
        editDialogVisible:false,
        deleteDialogVisible:false,
        editingContest:{
            id:1,
            contestName:'纳新赛',
            endTime:null
        },
        deletingContest:{
            id:1,
        },
        addingContest:{
            id:1,
            contestName:'纳新赛',
            endTime:null,
            openRegister:false
        }
    };
export default {
    name: 'contest',
    data(){
        return data;
    },
    mounted(){
        var data = {token:this.$store.state.token};
        this.$http.post('http://127.0.0.1:3000/api/getContest',data,{emulateJSON:true}).then(function(res){
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
        editContest(index, row) {
            this.editDialogVisible = true;
            this.editingContest = {
                id:row.id,
                contestName:row.contestName,
                endTime:row.endTime
            }
        },
        submitContest(){
            //ajax //后台修改比赛
            var data = {contest:this.editingContest,token:this.$store.state.token};
            var _this = this;
            this.$http.post('http://127.0.0.1:3000/api/editContest',data,{emulateJSON:true}).then(function(res){
                console.log(res.body.status);
                if(res.body.status===200){
                    this.$message("修改成功");
                    //前台修改比赛
                    for(var i=0;i<_this.contestlist.length;i++){
                        if(_this.contestlist[i].id===_this.editingContest.id){
                            _this.contestlist[i].contestName = _this.editingContest.contestName;
                            _this.contestlist[i].endTime = _this.editingContest.endTime;
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
        deleteContest() {
            //前端删除比赛
            for(var i=0;i<this.contestlist.length;i++){
                // console.log(this.contestlist[i].id);
                // console.log(this.deletingContest.id);
                if(this.contestlist[i].id===this.deletingContest.id){
                    this.contestlist.splice(i,1);
                }
            }
            //ajax 后台删除比赛
            var data = {contest:this.deletingContest,token:this.$store.state.token};
            this.$http.post('http://127.0.0.1:3000/api/deleteContest',data,{emulateJSON:true}).then(function(res){
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
        editStatus(row){
            //ajax 后台修改比赛状态
            var data = {contest:{id:row.id,openRegister:row.openRegister},token:this.$store.state.token};
            this.$http.post('http://127.0.0.1:3000/api/editContestStatus',data,{emulateJSON:true}).then(function(res){
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
        addContest(){//ajax 后台添加比赛
            // console.log(this.addingContest.endTime);
            this.addingContest.endTime = String(this.addingContest.endTime);
            // console.log(this.addingContest.endTime);
            var data = {contest:this.addingContest,token:this.$store.state.token};
            var _this = this;
            this.$http.post('http://127.0.0.1:3000/api/addContest',data,{emulateJSON:true}).then(function(res){
                console.log(res.body.status);
                if(res.body.status===200){
                    //前端添加比赛
                    // console.log(_this.addingContest.endTime);
                    var newContest = {
                        id:res.body.id,
                        endTime:_this.addingContest.endTime,
                        openRegister:_this.addingContest.openRegister,
                        contestName:_this.addingContest.contestName
                    };
                    this.contestlist.push(newContest);
                    this.$message("添加成功");
                }else {
                    this.$message("添加失败");
                }
            },function(res){
                console.log(res.status);
            });
            this.addDialogVisible = false;
            
        }

    }
}
</script>