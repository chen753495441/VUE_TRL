<template>
    <div>
        <!--首部区域-->
        <van-row>
            <van-col span="4">
                <!--分类区域-->
                <div class="HomeTopIcon" @click="ToCategroy">
                    <van-icon name="apps-o" size="40px" />
                </div>
            </van-col>
            <van-col span="16">
                <!--搜索栏区域-->
                <van-search placeholder="请输入搜索关键词" />
            </van-col>
            <van-col span="4" @click="ToLogin">
                <div class="HomeLoginText">
                    <!--跳转登录区域-->
                    <h3>登录</h3>
                </div>
            </van-col>
        </van-row>

        <!--图片轮播-->
        <van-swipe :autoplay="3000">
            <van-swipe-item v-for="(image,index) in images" :key="index">
                <img class="HomeLazyImg" v-lazy="image" />
            </van-swipe-item>
        </van-swipe>

        <!--分类区域-->
        <van-grid :border="false" :column-num="4" clickable>
            <van-grid-item @click="ToCategroy">
                <van-icon size="30px" name="shopping-cart"/>
                <van-grid-item text="线上超市" />
            </van-grid-item>
            <van-grid-item @click="ToCategroy">
                <van-icon size="30px" name="photograph" />
                <van-grid-item text="数码电器" />
            </van-grid-item >
            <van-grid-item @click="ToCategroy">
                <van-icon size="30px" name="bag" />
                <van-grid-item text="潮流服饰" />
            </van-grid-item>
            <van-grid-item @click="ToCategroy">
                <van-icon size="30px" name="weapp-nav" />
                <van-grid-item text="生鲜食品" />
            </van-grid-item>
        </van-grid>
        <van-grid :border="false" :column-num="4" clickable>
            <van-grid-item @click="ToCategroy">
                <van-icon size="30px" name="send-gift" />
                <van-grid-item text="送货到家" />
            </van-grid-item>
            <van-grid-item @click="ToCategroy">
                <van-icon size="30px" name="balance-list" />
                <van-grid-item text="充值缴费" />
            </van-grid-item>
            <van-grid-item @click="ToCategroy">
                <van-icon size="30px" name="todo-list" />
                <van-grid-item text="签到" />
            </van-grid-item>
            <van-grid-item @click="ToCategroy">
                <van-icon size="30px" name="diamond" />
                <van-grid-item text="会员" />
            </van-grid-item>
        </van-grid>
    </div>

</template>

<script>
    export default {
        data(){
            return {
                images: [
                    'https://img.yzcdn.cn/vant/apple-1.jpg',
                    'https://img.yzcdn.cn/vant/apple-2.jpg'
                ]
            }
        },
        methods:{
            ToCategroy(){
                this.$router.push('/category');
            },
            ToLogin(){
                this.$router.push("/login")
            }
        }
    }
</script>

<style scoped>
    .HomeTopIcon{
        margin-top: 8px;
        margin-left: 8px;
    }
    .HomeLoginText{
        margin-top: -5px;
        margin-left: 5px;
    }
    .HomeLazyImg{
        height:150px;
        width: 100%;
    }

</style>
