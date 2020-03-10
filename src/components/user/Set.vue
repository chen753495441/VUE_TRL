<template>
    <div>
        <top-back :content="title"></top-back>

        <van-grid :border="false" :column-num="1" class="usertop">
            <van-row>
                <van-col span="12"><van-icon name="manager-o" size="50" class="user" /></van-col>
                <van-col span="12" class="login"  @click="ToLogin" v-if="user.username == null">登录/注册</van-col>
                <van-col span="12" class="loginuser" v-if="user.username != null" style="font-size: larger">{{user.username}}</van-col>
            </van-row>
        </van-grid>

        <van-grid :column-num="1">
            <van-grid-item text="地址管理" @click="setAddress"/>
        </van-grid>

        <van-cell-group>
            <van-cell />
        </van-cell-group>

        <van-grid :column-num="1">
            <van-grid-item text="退出登录" @click="exitlogin"/>
        </van-grid>
    </div>
</template>

<script>
    import TopBack from "../TopBack";
    import { Toast } from 'vant';

    export default {
        components: {TopBack},
        data(){
            return{
                user:{
                    username:''
                },
                title:'设置'
            }
        },
        methods:{
            setAddress(){
                this.$router.push("/setaddress");
            },
            ToLogin(){
                this.$router.push("/login")
            },
            async exitlogin(){
                const {data:res} = await this.$http.post('user/logout.do')
                if(res.status!=200) return Toast.fail('退出登录失败！')
                window.sessionStorage.clear();
                Toast.success("退出登录成功！")
                this.$router.push("/user");
            },
            getUsername(){
                this.user.username = window.sessionStorage.getItem('username')
            }
        },
        created(){
            this.getUsername()
        }
    }
</script>

<style scoped>
    .usertop{
        height: 100px;
        width: 100%;
    }
    .user{
        padding-top: 20px;
        padding-left: 50px;
        height: 100%;
        width: 50px;
    }
    .loginuser{
        padding-top: 35px;
        padding-left: 40px;
    }
    .login{
        padding-top: 35px;
        padding-left: 20px;
    }
</style>
