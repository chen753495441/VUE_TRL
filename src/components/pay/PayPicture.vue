<template>
    <div>
        <h3>订单编号：{{this.orderNo}}</h3>
        <!--<van-button type="default" @click="setImages">点击获取支付二维码</van-button>-->
        <img
                width="100%"
                height="100%"
                :src="this.images"/>
    </div>
</template>

<script>
    import {Toast} from 'vant';

    export default {
        data() {
            return {
                images: '',
                orderNo: '',
                timer: null,
            }
        },
        methods: {
            async getImages() {
                this.orderNo = window.sessionStorage.getItem('orderNo')
                var params = new FormData();
                //生成支付二维码
                params.append('orderNo', window.sessionStorage.getItem('orderNo'));
                const {data: res} = await this.$http.post('order/pay.do', params)
                if (res.status != 200) return Toast.fail('获取支付二维码失败')
                var str =res.data.qrCode.split("/")
                this.images = 'http://m.rlgshop.xyz' + '/'+str[2]+'/'+str[3]
                // window.sessionStorage.setItem('str',res.data.qrCode)

            },
            async getOrderStatus() {
                var params = new FormData();
                //生成支付二维码
                params.append('orderNo', window.sessionStorage.getItem('orderNo'));
                const {data: res} = await this.$http.post('order/query_order_pay_status.do', params)
                if (res.status == 20) this.$router.push('/paysuccess');
                else this.getOrderStatus()
            },
            // setImages(){
            //     this.images= require('http://111.231.145.104:80'+window.sessionStorage.getItem('str'))
            // }
        },
        created() {
            this.getImages()
            clearInterval(this.timer)
            this.timer = null
        },
        mounted() {
            this.timer = setInterval(this.getOrderStatus(), 3000)
        },
        beforeDestroy() {
            clearInterval(this.timer)
            this.timer = null
        }
    }
</script>

<style scoped>

</style>
