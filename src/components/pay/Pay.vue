<template>
    <div>
        <top-back content="支付"></top-back>
        <router-view></router-view>
    </div>
</template>

<script>
    import TopBack from "../TopBack";
    export default {
        components: {TopBack}
    }
</script>

<style scoped>

</style>
