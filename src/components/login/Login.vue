<template>
    <div class="login">
        <van-nav-bar
                title="用户登录"
                left-text="返回"
                right-text="注册新用户"
                left-arrow
                @click-left="onClickLeft"
                @click-right="ToRegister"
        />

        <van-cell-group>
            <van-cell size="large" value=""/>
        </van-cell-group>

        <van-cell-group>
            <van-field
                    v-model="user.username"
                    required
                    clearable
                    label="用户名"
                    right-icon="question-o"
                    placeholder="请输入用户名"
                    @click-right-icon="$toast('请输入用户名')"
            />

            <van-row>
                <van-col span="18">
                    <van-field
                            v-model="user.password"
                            type="password"
                            label="密码"
                            placeholder="请输入密码"
                            required
                    />
                </van-col>
                <van-col span="6">
                    <van-button type="default" size="large" to="/getquestion">忘记密码</van-button>
                </van-col>
            </van-row>

        </van-cell-group>

        <van-button type="primary" size="large" @click="ToLogin">登录</van-button>

        <van-cell-group>
            <van-cell/>
        </van-cell-group>

        <van-divider>使用其它方法登录</van-divider>

        <van-image
                round
                width="3rem"
                height="3rem"
                :src="qq"
                class="qqicon"
        />
        <van-image
                round
                width="3rem"
                height="3rem"
                :src="wechat"
                class="wechaticon"
        />
    </div>
</template>

<script>
    import qq from '@/assets/QQ.png';
    import wechat from '@/assets/wechat.png';
    import { Toast } from 'vant';
    export default {
        data(){
            return{
                user:{
                    username:'',
                    password:''
                },
                qq:qq,
                wechat:wechat
            }
        },
        methods:{
            onClickLeft() {
                this.$router.go(-1);//返回上一层
            },
            ToRegister(){
                this.$router.push("/register");
            },
            async ToLogin(){
                var params = new FormData();
                params.append('username', this.user.username);
                params.append('password', this.user.password);
                const {data: res} = await this.$http.post('user/login.do', params)
                if (res.status != 200) return Toast.fail('登录失败！')
                Toast.success('登录成功！')
                window.sessionStorage.setItem('username',res.data.username)
                window.sessionStorage.setItem('userid',res.data.id)
                this.$router.push('/user')
            }
        }
    }
</script>

<style lang="less" scoped>
    .qqicon {
        position: relative;
        padding-top: 20px;
        left:40%;
        transform: translate(-50%,-50%);
    }
    .wechaticon{
        position: relative;
        padding-top: 20px;
        left:50%;
        transform: translate(-50%,-50%);
    }
</style>
