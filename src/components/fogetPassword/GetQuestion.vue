<template>
    <div>
        <van-cell-group>
            <van-cell size="large" value="" />
        </van-cell-group>
            <van-cell-group>
                <van-field
                        v-model="username"
                        required
                        clearable
                        label="用户名"
                        placeholder="请输入用户名"

                />
            </van-cell-group>

            <van-cell-group>
                <van-cell />
            </van-cell-group>

            <van-button  type="primary" size="large" color="red" round @click="Forget">下一步</van-button>
    </div>
</template>

<script>
    import { Toast } from 'vant';

    export default {
        data() {
            return {
                username:''
            }
        },
        methods: {
            async Forget(){
                if (this.checkUsername()==200) return Toast.fail('用户名不存在')
                var params = new FormData();
                params.append('username', this.username);
                const {data: res2} = await this.$http.post('user/forget_get_question.do', params)
                window.sessionStorage.setItem('username',this.username)
                window.sessionStorage.setItem('question',res2.msg)
                this.$router.push('/pushanswer')
            },
            async checkUsername(){
                //检测用户名是否存在
                var params = new FormData();
                params.append('str', this.username);
                params.append('type', 'username');
                const {data: res} = await this.$http.post('user/check_valid.do', params)
                return res.status;

            }

        }
    }
</script>

<style scoped>

</style>
