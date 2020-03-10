<template>
<div>
    <van-row>
        <van-col span="4">问题：</van-col>
        <van-col span="20">{{question}}</van-col>
    </van-row>

    <van-cell-group>
        <van-field
                v-model="answer"
                required
                clearable
                label="答案："
                placeholder="请输入问题答案"

        />
    </van-cell-group>

    <van-cell-group>
        <van-cell />
    </van-cell-group>

    <van-button  type="primary" size="large" color="red" round @click="GetAnswer">提交</van-button>

</div>
</template>

<script>
    import { Toast } from 'vant';

    export default {
        data(){
            return{
                question:'',
                answer:''
            }
        },
        methods:{
            async GetAnswer(){
                var params = new FormData();
                params.append('username', window.sessionStorage.getItem('username'));
                params.append('question', window.sessionStorage.getItem('question'));
                params.append('answer', this.answer);
                const {data: res} = await this.$http.post('user/forget_check_answer.do', params)
                if (res.status != 200) return Toast.fail('提交问题答案！')
                window.sessionStorage.setItem('Token',res.msg)
                this.$router.push('/changepassword')
            },
            setQuestion(){
                this.question = window.sessionStorage.getItem('question')
            }
        },
        created(){
            this.setQuestion()
        },
    }
</script>

<style scoped>

</style>
