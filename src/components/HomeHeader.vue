<script>
import { RouterLink } from 'vue-router';
export default {
    data() {
        return {
            location: 0,
            isLogPage: false
        }
    },
    methods: {
        switchLocation(locoNum) {
            this.location = locoNum;
        },
        logout() {
            sessionStorage.clear();
            this.$router.push("/");
        },
        gF() {
            this.$router.push("/f_home");

        }
    }
}
</script>
<template>
    <header class="murasaki pt-2 pb-1 d-flex justify-content-between align-items-end px-5">
        <a class="h2 fw-bold border-text" style="padding-bottom: 0.5rem; text-decoration: none;" @click="gF">最新消息</a>
    </header>
</template>
<style lang="scss" scoped>
.navBtn {
    color: white;
    padding: 8px 42px;
    text-decoration: none;
}

.target {
    background-color: white;
    color: #084279;
    border-radius: 6px 6px 0 0;
}

.murasaki {
    background-color: rgb(143, 77, 143);
}



.border-text {
    display: inline-block;
    padding: 0.5rem;
    /* 调整链接的内边距 */
    text-decoration: none;
    color: black;
    background-color: rgb(221, 165, 221);
    border-radius: 5px;
    /* 调整边框圆角 */
    box-shadow: 0 0 0 2px white;
    /* 创建一个白色边框效果，调整第三个值来控制边框宽度 */
}
</style>