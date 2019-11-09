<template>
  <div id="login">
    <a-button type="primary" size="large" @click="toJumpHome">登录</a-button>
  </div>
</template>

<script>
export default {
    data() {
        return {

        }
    },
    methods: {
        toJumpHome() {
            this.$router.push({
                path: '/home',
            })
        }
    }
}
</script>

<style lang="less" scoped>
    #login {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>