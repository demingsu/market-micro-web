<template>
    <div>
        <h2>This is login page.</h2>
        <h3 @click="setToken">
            设置token
        </h3>
        <p>
            <el-button type="primary" @click="$router.push('/home')">登录</el-button>
        </p>
    </div>
</template>

<script>
    export default {
        methods: {
            setToken() {
                this.$root.setValue('my token: TOKEN--' + Date.now())
                this.$root.rootStore.commit('mutationToken', 'my token: TOKEN--' + Date.now())
                this.$store.commit('mutationToken', 'token--' + Math.random())
            }
        }
    }
</script>