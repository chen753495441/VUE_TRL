<template>
    <div>
        <van-contact-card
                type="cardType"
                :name="address.receiverName"
                :tel="address.receiverMobile"
                @click="ToAddress"
        />

        <div v-for="(good,index) in goods" :key="index">

            <van-swipe-cell>

                <van-row>
                    <van-card
                            :price="good.price*good.quantity"
                            :desc="good.subtitle"
                            :title="good.name"
                            :thumb="good.mainImage"
                            @click-thumb="toGoods(good.productId)">
                        <div slot="footer">
                            <van-stepper v-model="good.quantity" integer min="1" :max="goodss.stock"
                                         @change="AddGood(good.productId,good.quantity)"/>
                        </div>
                    </van-card>
                </van-row>

            </van-swipe-cell>

        </div>

        <van-submit-bar
                :price="countprice*100"
                button-text="提交订单"
                @submit="OnSubmit"
        >
        </van-submit-bar>
    </div>
</template>

<script>
    import { Toast } from 'vant';

    export default {
        data(){
            return{
                checkGoods: [],
                goods: '',
                countprice: 0,
                goodss: '',
                address: [],
            }
        },
        methods:{
            //获取用户购物车数据
            async getCart(){
                //获取选中商品
                const {data: res} = await this.$http.post('cart/list.do')
                if (res.status != 200) return Toast.fail(res.msg)
                this.goods = res.data.cartProductVOList
                //更新总价
                this.countprice = res.data.cartTotalPrice
                //更改商品选中图标
                this.checked = res.data.allChecked
                //获取商品选中状态
                //重置选中数组
                this.result=[]
                for(var i=0;i<this.goods.length;i++){
                    if(this.goods[i].productChecked===1){
                        this.result.push(this.goods[i].productId);
                    }
                }
            },
            //更改商品数量
            async AddGood(goodId,value){
                var params = new FormData();
                params.append('productId', goodId);
                //获取商品库存，设置计步器最大值
                const {data:res} = await this.$http.post('product/detail.do',params)
                if (res.status != 200) return Toast.fail(res.msg)
                this.goodss = res.data
                params.append('count', value);
                const {data: res1} = await this.$http.post('cart/update.do',params)
                if (res1.status != 200) return Toast.fail(res1.msg)
                this.getCart()
            },
            //获取登录用户收货地址
            async getAddress() {
                if(window.sessionStorage.getItem('shippingId')==null){
                    const {data:res} = await this.$http.post('address/search.do')
                    if(res.status!=200)return Toast.fail('获取用户地址失败')
                    this.address = res.data[0]
                }
                else{
                    var params = new FormData();
                    params.append('shippingId', window.sessionStorage.getItem('shippingId'));
                    const {data:res} = await this.$http.post('address/searchAddress.do',params)
                    this.address = res.data
                }
            },
            //提交用户默认地址，创建订单
            async OnSubmit() {
                var params = new FormData();
                params.append('shippingId', window.sessionStorage.getItem('shippingId'));
                const {data:res} = await this.$http.post('order/create.do',params)
                if(res.status!=200) return Toast.fail('创建订单失败')
                window.sessionStorage.setItem("orderNo")
                this.$router.push('/')
            },
            //设置收货地址
            ToAddress() {
                this.$router.push('/setaddress');
            },
        },

        created(){
            this.getCart()
            this.getAddress()
        }
    }
</script>

<style scoped>

</style>
