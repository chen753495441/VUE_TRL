<template>
  <div id="app">
    <!--路由占位符-->
    <router-view></router-view>

    <!--底部菜单-->
    <van-tabbar route>
      <van-tabbar-item name="home" icon="home-o" to="/">首页</van-tabbar-item>
      <van-tabbar-item name="category" icon="apps-o" to="/category">分类</van-tabbar-item>
      <van-tabbar-item name="cart" icon="shopping-cart-o" to="/cart">购物车</van-tabbar-item>
      <van-tabbar-item name="user" icon="contact" to="/user">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
}
</script>

<style>

</style>
