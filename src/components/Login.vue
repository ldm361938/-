<template>
    <div class="login_container">
        <div ref="ceshi"></div>
        <input type="text" @input="fn($event)">
        <div class="login_box">
            <!-- 头像区域 -->
            <div class="login_avatar">
                <img src="../assets/logo.png" alt="">
            </div>
            <!-- 登录表单区域 -->
            <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" class="login_form">
            <!-- 用户名区域 -->
            <el-form-item prop="username">
                <el-input v-model="loginForm.username" prefix-icon="iconfont icon-user" ></el-input>
            </el-form-item>
            <!-- 密码区域 -->
            <el-form-item prop="password">
                <el-input v-model="loginForm.password" prefix-icon="iconfont icon-3702mima" type="password"></el-input>
            </el-form-item>
            <!-- 按钮区域 -->
            <el-form-item class='btns'>
               <el-button type="primary" @click="login">登录</el-button>
               <el-button type="info" @click="reset"> 重置</el-button>
            </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
export default {
    name:'login',
    data () {
        return {
            loginForm:{
                username:'zs',
                password:'123'
            },
            loginFormRules:{
                username:[ 
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
                ],
                password:[
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
                    ]
            }
        }
    },
    methods:{
        fn(e){
            console.log(this.$refs.ceshi.innerHTML);
            
        },
        reset(){
            this.$refs.loginFormRef.resetFields()
        },
        login(){
            this.$refs.loginFormRef.validate(async valid=>{
                if(!valid) return;
               const {data:res} = await this.$http.post('login',this.loginForm)
                if(res.meta.status!==200)return this.$message.error('用户名或密码输入错误')
                this.$message.success('验证通过')
                // token保存到sessionStorage
                window.sessionStorage.setItem('token',res.data.token)
                this.$router.push('/home')
                
            })
        }
    }
}
</script>
<style scoped lang="less">
    .login_container {
        background-color: #2b4b6b;
        height: 100%;
    }
    .login_box {
        width: 450px;
        height: 300px;
        background-color: #fff;
        position: absolute;
        top: 50%;
        left:50%;
        transform: translate(-50%,-50%);
        .login_avatar {
            width: 130px;
            height: 130px;
            background: #eee;
            border-radius: 50%;
            position: absolute;
            left:50%;
            top: 0;
            transform: translate(-50%,-50%);
            padding: 10px;
            box-shadow:0 0 10px #ddd;
            img{
                width: 100%;
                border-radius: 50%;
            }
        }
        .login_form {
            position: absolute;
            left:0;
            bottom:0;
            width:100%;
            box-sizing: border-box;
            padding: 0 20px;
            .btns{
                display: flex;
                justify-content: flex-end;
            }

        }
    }
</style>