<template>
    <div>
        <top-back :content="title"></top-back>
        <router-view></router-view>
    </div>
</template>

<script>
    import TopBack from "../TopBack";
    export default {
        components: {TopBack},
        data(){
            return{
                username:'',
                question:'',
                answer:'',
                forgetToken:'',
                passwordNew:'',
                password2:'',
                title:'忘记密码',
            }
        }
    }
</script>

<style scoped>

</style>
