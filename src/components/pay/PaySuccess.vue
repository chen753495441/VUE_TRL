<template>
    <div>
        <h3>支付成功</h3>
        <h4>......3秒将自动返回主页</h4>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                timer: null
            }
        },
        methods:{
            backhome(){
                sessionStorage.removeItem('orderNo')
                this.$router.push('/')
            }
        },
        created(){
            clearInterval(this.timer)
            this.timer = null
        },
        mounted(){
            this.timer = setInterval(this.backhome(), 3000)
        },
        beforeDestroy() {
            clearInterval(this.timer)
            this.timer = null
        }
    }
</script>

<style scoped>

</style>
