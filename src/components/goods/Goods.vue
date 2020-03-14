<template>
    <div>
        <top-back content=""></top-back>

        <van-swipe class="goods-swipe" :autoplay="3000">
            <van-swipe-item v-for="(srchost,index) in goods.subImages" :key="index">
                <img :src="srchost" >
            </van-swipe-item>
        </van-swipe>

        <van-cell-group>
            <van-cell>
                <div class="goods-title">{{ goods.subtitle }}</div>
                <div class="goods-price">{{ goods.price }}</div>
            </van-cell>
            <van-cell class="goods-express">
                <van-col span="10">运费：免运费</van-col>
                <van-col span="14">剩余：{{ goods.stock }}</van-col>
            </van-cell>
        </van-cell-group>

        <van-panel>
            <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }">
                商品详情
            </van-divider>

            <van-image
                    width="100%"
                    height="100%"
                    fit="contain"
                    :src="goods.detail"
            />
        </van-panel>

        <van-popup
                v-model="show"
                round
                closeable
                position="bottom"
                :style="{ height: '30%' }"
                @close="OnClose"
        >
            <div class="shopping">
                <van-row>

                    <van-col span="8">
                        <van-image
                                width="100"
                                height="100"
                                :src="this.goods.mainImage"
                        />
                    </van-col>

                    <van-col span="16">
                        <van-panel :title="goods.subtitle">
                            <div class="shoptitle">{{'$'+this.countprice}}</div>
                        </van-panel>
                    </van-col>
                    <van-stepper v-model="value" :integer="true" min="1" :max="goods.stock" @change="onChange" />
                </van-row>

            </div>

            <van-button type="danger" size="large" class="queren" @click="toCart">确认</van-button>
        </van-popup>

        <van-goods-action id="vga">
            <van-goods-action-icon icon="chat-o" @click="sorry">
                客服
            </van-goods-action-icon>
            <van-goods-action-icon icon="cart-o" to="/cart" :info="num">
                购物车
            </van-goods-action-icon>
            <van-goods-action-button type="warning" @click="OnClickCart">
                加入购物车
            </van-goods-action-button>
            <van-goods-action-button type="danger" @click="toCart">
                立即购买
            </van-goods-action-button>
        </van-goods-action>
    </div>
</template>

<script>
    import TopBack from "../TopBack";
    import { Toast } from 'vant';

    export default {
        components: {TopBack},
        data(){
            return{
                goods: [],
                num:0,
                show: false,
                countprice:0,
                value:1,
            }
        },
        methods:{
            sorry(){
              Toast.fail('该功能未实现')
            },
            addOne(){
                this.$toast.success('加入成功~');
                this.show=false;
            },
            OnClickCart(){
                this.show=true;
            },
            OnClose(){
                this.value=1;
            },
            //添加购物车
            async toCart(){
                var params = new FormData();
                params.append('productId', window.sessionStorage.getItem('goodsId'));
                params.append('count', this.value);
                const {data:res} = await this.$http.post('cart/add.do',params)
                if(res.status!=200)return Toast.fail(res.msg)
                Toast.success(res.msg,"添加购物车成功");
                this.value=1
                this.$router.push('/cart');
            },
            onChange(){
                this.countprice=this.goods.price*this.value;
            },
            //获取商品详情
            async getProductsDetil(){
                var params = new FormData();
                params.append('productId', window.sessionStorage.getItem('goodsId'));
                const {data:res} = await this.$http.post('product/detail.do', params)
                if(res.status!=200)return Toast.fail('获取商品详情失败')
                this.goods=res.data;
                this.countprice=this.goods.price;
            },
            //获取购物车中商品条数
            async getCartNum(){
                const {data:res} = await this.$http.post('cart/get_cart_product_count.do')
                if(res.status!=200)return Toast.fail('获取购物车商品条数失败')
                this.num=res.data
            }
        },
        created(){
            this.getProductsDetil()
            this.getCartNum()
        }
    }
</script>

<style lang="less" scoped>
    .shopping{
        padding:20px;
    }
    .shoptitle{
        padding-left: 16px;
        color: #ee0a24;
    }
    .queren{
        position:fixed;
        bottom:0;
    }
    #vga{
        z-index: 100;
    }
    .goods {
        margin-bottom: 150px;
        &-swipe {
            img {
                width: 100%;
                display: block;
                height: 300px;
            }
        }
        &-title {
            font-size: 16px;
        }
        &-price {
            color: #f44;
        }
        &-express {
            color: #999;
            font-size: 12px;
            padding: 5px 15px;
        }
        &-cell-group {
            margin: 15px 0;
            .van-cell__value {
                color: #999;
            }
        }
        &-tag {
            margin-left: 5px;
        }
    }
</style>
