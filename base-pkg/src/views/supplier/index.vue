<template>
    <div>
        <h2>This is login page.</h2>
        <h3 @click="getToken">
            获取全局token
        </h3>
        <h4>全局token：{{globalToken}}</h4>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                globalToken: ''
            }
        },
        methods: {
            getToken() {
                this.globalToken = this.$root.getValue('getToken')
                console.log('getters获取全局token：', this.$root.rootStore.getters.getToken);
            }
        }
    }
</script>