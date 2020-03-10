<template>
    <div>
        <top-back content="收货地址管理"></top-back>

        <van-radio-group v-model="radio" v-for="(adds,index) in address" :key="index">
            <van-cell-group>
                <van-cell
                        :title="adds.receiverName+','+adds.receiverMobile"
                        :label="adds.receiverAddress"
                        @click="setAddress(adds.id)">
                    <van-radio slot="right-icon" :name="adds.id" />
                </van-cell>
            </van-cell-group>
        </van-radio-group>
    </div>
</template>

<script>
    import TopBack from "../TopBack";

    export default {
        components: {TopBack},
        data() {
            return {
                title: '收货地址管理',
                radio:'',
                address: [],
            };
        },
        methods: {
            //设置默认用户收货地址
            setAddress(shippingId){
                this.radio=shippingId;
                window.sessionStorage.setItem("shippingId",shippingId)
                this.$router.go(-1);
            },
            //获取登录用户收货地址
            async getAddress() {
                //获取收货地址
                const {data:res} = await this.$http.post('address/search.do')
                this.address = res.data
            },
        },
        created(){
            this.getAddress()
        }
    }
</script>

<style scoped>

</style>
