<template>
    <div>
        <img
                width="100%"
                height="100%"
                :src="images"/>
    </div>
</template>

<script>
    import { Toast } from 'vant';

    export default {
        data(){
            return{
                images:''
            }
        },
        methods:{
            async getImages(){
                var params = new FormData();
                //生成支付二维码
                params.append('orderNo', window.sessionStorage.getItem('orderNo'));
                const {data:res} = await this.$http.post('order/pay.do',params)
                console.res(res)
                if(res.status!=200)return Toast.fail('获取支付二维码失败')
                this.images = res.data
            }
        }
    }
</script>

<style scoped>

</style>
