<template>
  
       <el-container class="home_container">
        <el-header>
            <div class="left">
                <img src="../assets/heima.png" alt="">
                <h3>电商后台管理系统</h3>
            </div>
            <el-button type="primary" @click="logout">退出</el-button>
        </el-header>
        <el-container>
            <el-aside :width="isCollapse==true?'64px':'200px'">
                <div class="toggle-button" @click.prevent="toggleCollapse">|||</div>
                <el-menu background-color="#333744" text-color="#fff" active-text-color="blue" unique-opened :collapse="isCollapse" :collapse-transition="false" router :default-active="activePath">
                <el-submenu :index="item.id + ''" v-for="item in list" :key="item.id">
                    <template slot="title">
                        <i class="iconfont" :class="iconsObj[item.id]"></i>
                        <span>{{item.authName}}</span>
                    </template>
                    <el-menu-item :index="'/'+subItem.path" v-for="subItem in item.children" :key="subItem.id" @click="toggleActivePath('/'+subItem.path)">
                        <template slot="title">  
                        <i class="el-icon-menu"></i>
                        <span>{{subItem.authName}}</span>
                       </template>
                    </el-menu-item>
                </el-submenu>
                </el-menu>
            </el-aside>
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
      </el-container> 
</template>
<script>
export default {
    name:'home',
    created(){
        this.getMenueList()
        this.activePath=window.sessionStorage.getItem('activePath')
    },
    data(){
        return{
            // 数据一定要初始化，否则就不是响应式的
            list:[],
            iconsObj:{
                125:'icon-users',
                103:'icon-tijikongjian',
                101:'icon-3702mima',
                102:'icon-danju',
                145:'icon-baobiao',

            },
            isCollapse:false,
            activePat:''
          
        }
    },
    methods:{
        logout(){
            window.sessionStorage.clear()
            this.$router.push('/login')
        },
        async getMenueList(){
            const {data:res}= await this.$http.get('menus')
            if(res.meta.status!==200) return this.$message.error('获取列表失败')
            this.list=res.data
            console.log(this.list);
            

        },
        toggleCollapse(){
            this.isCollapse=!this.isCollapse
        },
        toggleActivePath(activePath){
            this.activePath=activePath
            window.sessionStorage.setItem('activePath',activePath)
        }
    }
}
</script>

<style lang="less" scoped>
    .home_container{
        height: 100%;
        .el-aside{
            background: #333744;
            .iconfont{
                margin-right: 10px;
            }
        }
        .el-header{
            background: #373d41;
            display: flex;
            justify-content:space-between;
            align-items: center;
            padding-left:0;
            .left{
                display: flex;
                align-items: center;
                color:#fff;
                font-size: 20px;
             img{
                margin-right: 10px;
            }
             h3{
                font-weight: normal;
            }
            }
            

        }
        .el-main{
            background: #eaedf1;
        }
    }
    .el-menu{
        border-right:none;
    }
    .toggle-button{
        height: 24px;
        line-height: 24px;
        font-size: 14px;
        color:#fff;
        letter-spacing: 2px;
        text-align: center;
        cursor: pointer;
    }
</style>