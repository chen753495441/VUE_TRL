<template>
    <div>
        <top-back content="购物车"></top-back>
            <div v-for="(good,index) in goods" :key="index">

                <van-swipe-cell>

                    <van-row>
                        <van-col span="2">
                            <van-checkbox-group v-model="result">
                                <van-checkbox class="check" :name="good.productId" @click="OnChange(good.productId,good.productChecked)"></van-checkbox>
                            </van-checkbox-group>
                        </van-col>
                        <van-col span="22">
                            <van-card
                                    :price="good.price*good.quantity"
                                    :desc="good.subtitle"
                                    :title="good.name"
                                    :thumb="good.mainImage"
                                    @click-thumb="toGoods(good.productId)"
                                    >
                                <div slot="footer">
                                    <van-stepper v-model="good.quantity" integer min="1" :max="goodss.stock" @change="AddGood(good.productId,good.quantity)" />
                                </div>
                            </van-card>
                        </van-col>
                    </van-row>

                    <!--右滑删除商品按钮-->
                    <template slot="right">
                        <div style="padding-top: 40px;padding-bottom:50px;background-color: #ee0c26;">
                            <van-button square type="danger" text="删除" @click="OnDelete(good.productId)" />
                        </div>
                    </template>

                </van-swipe-cell>

            </div>

            <van-submit-bar
                    :price="countprice*100"
                    button-text="去结算"
                    @submit="ToShop()"
            >
                <van-checkbox v-model="checked" @click="selectAll">全选</van-checkbox>
            </van-submit-bar>
    </div>
</template>

<script>
    import TopBack from "../TopBack";
    import { Toast } from 'vant';

    export default {
        components: {TopBack},
        data(){
            return{
                goods:[],
                checked: false,
                goodss:'',
                countprice:0,
                result:[],
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
            //全选和取消全选
            async selectAll(){
                var params = new FormData();
                if(this.checked ==false){
                    params.append('check', 1);
                    const {data:res} = await this.$http.post('cart/select_all.do',params)
                    //更改商品选中图标
                    this.checked = res.data.allChecked
                    //更新总价
                    this.countprice = res.data.cartTotalPrice
                }
                else{
                    params.append('check', 0);
                    const {data:res} = await this.$http.post('cart/un_select_all.do',params)
                    //更改商品选中图标
                    this.checked = res.data.allChecked
                    //更新总价
                    this.countprice = res.data.cartTotalPrice
                    //清空result数组，取消所有选中图标
                    this.result=[]
                }
                //更新goods中的选中信息
                this.getCart()
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
            //选中和取消选中商品
            async OnChange(goodId,check){
                var params = new FormData();
                params.append('productId', goodId);
                if(check ==1){
                    params.append('check', 0);
                    const {data:res} = await this.$http.post('cart/un_select.do',params)
                    //更改商品选中图标
                    this.checked = res.data.allChecked
                    //更新总价
                    this.countprice = res.data.cartTotalPrice
                }
                else{
                    params.append('check', 1);
                    const {data:res} = await this.$http.post('cart/select.do',params)
                    //更改商品选中图标
                    this.checked = res.data.allChecked
                    //更新总价
                    this.countprice = res.data.cartTotalPrice
                }
                //更新goods中的选中信息
                this.getCart()
            },
            //删除购物车商品
            OnDelete(productId){
                var params = new FormData();
                params.append('productIds',productId);
                this.$http.post('cart/delete_product.do',params)
                //更新购物车
                this.getCart()

            },
            //结算
            ToShop(){
                this.$router.push("/settlement");
            },
            //点击商品查看商品详情
            toGoods(goodId){
                window.sessionStorage.setItem('goodsId',goodId)
                this.$router.push('/goods');
            }
        },
        created(){
            this.getCart()
        }
    }
</script>

<style scoped>
    .check{
        padding-top: 40px;
        padding-left: 10px;
    }
</style>
