<template>
    <div>
        <van-nav-bar>
            <van-icon name="setting-o" slot="right" size="23px" @click="ToUserSet">
            </van-icon>
        </van-nav-bar>
        <van-grid :border="false" :column-num="1" class="usertop">
            <van-row>
                <van-col span="12"><van-icon name="manager-o" size="50" class="user" /></van-col>
                <van-col span="12" class="login" v-if="users.username == null" @click="ToLogin">登录/注册</van-col>
                <van-col span="12" class="loginuser" v-if="users.username !=null " style="font-size: larger" @click="ToUserSet">{{users.username}}</van-col>
            </van-row>
        </van-grid>
        <van-row class="user-links">
            <van-col span="6">
                <van-icon name="pending-payment" />
                待付款
            </van-col>
            <van-col span="6">
                <van-icon name="records" />
                待接单
            </van-col>
            <van-col span="6">
                <van-icon name="tosend" />
                待发货
            </van-col>
            <van-col span="6">
                <van-icon name="logistics" />
                已发货
            </van-col>
        </van-row>

        <van-cell-group class="user-group">
            <van-cell icon="records" title="全部订单" is-link />
        </van-cell-group>
    </div>
</template>

<script>
    import { Row, Col, Icon, Cell, CellGroup } from 'vant';

    export default {
        comments:{
            [Row.name]: Row,
            [Col.name]: Col,
            [Icon.name]: Icon,
            [Cell.name]: Cell,
            [CellGroup.name]: CellGroup
        },
        data(){
            return{
                users:{
                    username:''
                }
            }
        },
        methods:{
            getUser(){
                this.users.username = window.sessionStorage.getItem('username')
            },
            ToUserSet() {
                this.$router.push("/userset")
            },
            ToLogin(){
                this.$router.push("/login")
            }
        },
        created(){
            this.getUser()
        }
    }
</script>

<style scoped>
    .user-group {
        margin-bottom: 15px;
    }
    .user-links {
        padding: 15px 0;
        font-size: 12px;
        text-align: center;
        background-color: #fff;
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
