<template>
    <div>
        <van-cell-group>
            <van-field
                    v-model="passwordNew"
                    type="password"
                    required
                    clearable
                    label="新密码："
                    placeholder="请输入新密码"
            />
            <van-field
                    v-model="password2"
                    type="password"
                    label="确认密码"
                    placeholder="请再次输入新密码"
                    required
            />
        </van-cell-group>

        <van-cell-group>
            <van-cell />
        </van-cell-group>

        <van-button  type="primary" size="large" color="red" round @click="GetPasswordNew">提交</van-button>
    </div>
</template>

<script>
    import { Toast } from 'vant';

    export default {
        data(){
            return{
                passwordNew:'',
                password2:''
            }
        },
        methods:{
            async GetPasswordNew(){
                if (this.passwordNew != '' && this.password2 != '') {
                    if (this.passwordNew == this.password2) {
                        var params = new FormData();
                        params.append('username', window.sessionStorage.getItem('username'));
                        params.append('forgetToken', window.sessionStorage.getItem('Token'));
                        params.append('passwordNew', this.passwordNew);
                        const {data: res} = await this.$http.post('user/forget_reset_password.do', params)
                        if (res.status != 200) return Toast.fail('修改密码失败！')
                        Toast.success('修改密码成功')
                        window.sessionStorage.clear();
                        this.$router.push('/login')
                    }else{
                        Toast.fail('两次密码必须相同');
                    }
                }else{
                    Toast.fail('密码不能为空');
                }
            }
        }
    }
</script>

<style scoped>

</style>
