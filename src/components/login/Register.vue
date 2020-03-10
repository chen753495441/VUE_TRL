<template>
    <div>
        <top-back :content="title"></top-back>

        <van-cell-group>
            <van-cell size="large" value=""/>
        </van-cell-group>

        <van-cell-group>
            <van-field
                    v-model="user.username"
                    autofocus="autofocus"
                    required
                    clearable
                    label="用户名"
                    right-icon="question-o"
                    placeholder="请输入用户名"
                    @click-right-icon="$toast('请输入用户名')"
                    @blur="unBlurUsername"
            />

            <van-field
                    v-model="user.password"
                    type="password"
                    label="密码"
                    placeholder="请输入密码"
                    required
            />

            <van-field
                    v-model="password2"
                    type="password"
                    label="确认密码"
                    placeholder="请再次输入密码"
                    required
                    @blur="unBlurPassword"
            />

            <van-field
                    v-model="user.question"
                    required
                    label="密保问题"
                    placeholder="请输入问题"
            />

            <van-field
                    v-model="user.answer"
                    required
                    label="密保答案"
                    placeholder="请输入问题答案"
            />
        </van-cell-group>

        <van-button type="primary" size="large" @click="ToRegister">注册</van-button>
    </div>
</template>

<script>
    import TopBack from "../TopBack";
    import {Toast} from 'vant';

    export default {
        components: {TopBack},
        data() {
            return {
                user: {
                    username: '',
                    password: '',
                    question: '',
                    answer: ''
                },
                title: '新用户注册',
                password2: '',
                reusername: 0,
            }
        },
        methods: {
            async unBlurUsername() {
                //当用户输入用户名之后，鼠标焦点移开
                //1.判断当前注册的用户名是否存在
                //2.如果用户名存在就对用户提示，然后焦点重新定位到用户名输入框，并清空
                //保存当前对象
                //封装前端传递给后端的数据
                var params = new FormData();
                params.append('str', this.user.username);
                params.append('type', 'username');
                //执行请求获取后端数据
                const {data: res} = await this.$http.post('user/check_valid.do', params)
                if (res.status != 200) {
                    this.reusername = 1;
                    return Toast.fail('用户名已存在！');
                }
                console.log(res)
                this.reusername = 0;
                Toast.success('用户名可以注册！')
            },
            unBlurPassword() {
                //当用户输入用户名之后，鼠标焦点移开
                //3.判断两次输入的密码是否一样
                //4.密保问题和答案内容不能为空
                if (this.user.password != this.password2) return Toast.fail('两次密码不一致！')
            },
            async ToRegister() {
                if (this.user.password != '' && this.password2 != '') {
                    if (this.user.password == this.password2) {
                        if (this.user.question != '' && this.user.answer != '') {
                            if (this.reusername == 0) {
                                //封装前端传递给后端的数据
                                var params = new FormData();
                                params.append('username', this.user.username);
                                params.append('password', this.user.password);
                                //执行请求获取后端数据
                                const {data: res} = await this.$http.post('user/register.do', this.user)
                                if (res.status != 200) return Toast.fail('注册失败！')
                                //自动帮用户登录
                                const {data:res2} = await this.$http.post('user/login.do', params)
                                if (res2.status != 200) {
                                    this.$router.push('/login')
                                    return Toast.fail('注册成功，自动登录失败，请手动登录！')
                                }
                                Toast.success('注册成功，已为您自动登录！')
                                window.sessionStorage.setItem('username',res2.data.username)
                                this.$router.push('/user')
                                //重置数据
                                this.user.username = '';
                                this.user.password = '';
                                this.user.question = '';
                                this.user.answer = '';
                                this.user.password2 = '';
                                this.reusername = 0;
                            } else {
                                Toast.fail('用户名已存在');
                            }
                        } else {
                            Toast.fail('密保问题答案不能为空');
                        }
                    } else {
                        Toast.fail('两次输入的密码必须相同');
                    }
                } else {
                    Toast.fail('密码不能为空');
                }
            }
        }
    }
</script>

<style scoped>

</style>
