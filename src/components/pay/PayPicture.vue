<template>
    <div>
        <h3>订单编号：{{this.orderNo}}</h3>
        <van-button type="default">点击获取支付二维码</van-button>
        <img
                width="100%"
                height="100%"
                :src="this.images"/>
    </div>
</template>

<script>
    import { Toast } from 'vant';

    export default {
        data(){
            return{
                images:'',
                orderNo:''
            }
        },
        methods:{
            async getImages(){
                this.orderNo = window.sessionStorage.getItem('orderNo')
                var params = new FormData();
                //生成支付二维码
                params.append('orderNo', window.sessionStorage.getItem('orderNo'));
                const {data:res} = await this.$http.post('order/pay.do',params)
                if(res.status!=200)return Toast.fail('获取支付二维码失败')
                this.images = 'http://localhost'+res.data.qrCode
                // var str =res.data.qrCode.split("/")
                // window.sessionStorage.setItem('str',str[7])
            },
            // setImages(){
            //     this.images= require('@/assets/payimg/'+window.sessionStorage.getItem('str'))
            // }
        },
        created(){
            this.getImages()
        }
    }
</script>

<style scoped>

</style>
