<template>
    <div>
        <!-- 面包屑导航区域 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card>
            <!-- element ui 栅格 24 -->
            <el-row>
                <el-col :span="10">
                    <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="getUserList">
                        <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
                    </el-input>
                </el-col>
                <el-col :span="14">
                    <el-button type="primary" @click="addDialogVisible=true">添加用户</el-button>
                </el-col>
            </el-row>
            <!-- 用户列表区域 -->
            <el-table :data="userslist" border stripe>
                <el-table-column label="索引" type="index"></el-table-column>
                <el-table-column label="姓名" prop="username"></el-table-column>
                <el-table-column label="电话" prop="mobile"></el-table-column>
                <el-table-column label="邮箱" prop="email"></el-table-column>
                <el-table-column label="角色" prop="role_name"></el-table-column>
                <el-table-column label="状态" >
                    <template slot-scope="scope">
                        <el-switch v-model="scope.row.mg_state" @change="change(scope.row)"></el-switch>
                    </template>
                </el-table-column>
                <el-table-column label="操作"  width="260px">
                    <template slot-scope="scope">
                        <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
                        <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
                        <el-tooltip class="item" effect="dark" content="分配角色" placement="top" :enterable="false">
                        <el-button type="warning" icon="el-icon-setting" size="mini"></el-button>
                        </el-tooltip>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页区域 -->
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="queryInfo.pagenum"
                :page-sizes="[1,2,3,4]"
                :page-size="queryInfo.pagesize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
        </el-card>
        <!-- 添加用户的对话框 -->
        <el-dialog
        title="提示"
        :visible.sync="addDialogVisible"
        width="50%" >
        <span>这是一段信息</span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="addDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="addDialogVisible = false">确 定</el-button>
        </span>
        </el-dialog>
    </div>
</template>
<script>
export default {
    data () {
        return {
            // 获取用户列表参数对象
            queryInfo:{
                query:'', //查询关键字
                pagenum:1, 
                pagesize:2 //
            },
            userslist:[],
            total:0,
            addDialogVisible:false
        }
    },
    created(){
        this.getUserList()
    },
    methods:{
       async getUserList(){
           const {data:res} = await this.$http.get('users',{params:this.queryInfo})
           if(res.meta.status !=200)return this.$message.error('请求列表数据失败') 
           this.total=res.data.total
           this.userslist=res.data.users
        },
        // 监听 pagesize 改变事件
        handleSizeChange(newSize){
          //console.log(newSize);
          this.queryInfo.pagesize=newSize
          this.getUserList()          
        },
        // 监听页码值 改变事件
         handleCurrentChange(newPage){
       // console.log(newPage);
          this.queryInfo.pagenum=newPage
          this.getUserList()  
        },
        // 监听swich开关状态的改变
        async change(info){
            const {data:res} = await this.$http.put(`users/${info.id}/state/${info.mg_state}`)
            if(res.meta.status !=200)return this.$message.error('修改失败')

        }
    }
    
}
</script>
<style scoped lang="less">
    
</style>