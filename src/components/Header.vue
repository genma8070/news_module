<script>
import { RouterLink } from 'vue-router';

export default {
    data() {
        return {
            location: 0,
            isLogPage: false,
            currentPath: '' // 新增 currentPath 屬性
        }
    },
    methods: {
        switchLocation(locoNum) {
            this.location = locoNum;
        },
        logout() {
            this.$router.push("/");
        },
        go() {
            this.$router.push("/add/c");
        },
      
    },
    mounted() {
        // 獲取當前網址名稱並保存在 currentPath 屬性中
        this.currentPath = window.location.pathname;
    }
}
</script>

<template>
    <header class="murasaki px-4 pt-4 d-flex justify-content-between align-items-end px-5">
        <nav  v-if="$route.name === 'a'" class="d-flex">
            <h4 class="bg-white mx-4">問券</h4>    
            <h4 class="mx-4">問題</h4>    
            <a class="mx-4 h4" v-on:click="go">問券回饋</a>    
            <h4 class="mx-4">統計</h4>    
        </nav>
        <nav v-else-if="$route.name === 'b'" class="d-flex">
            <h4 class="mx-4">問券</h4>    
            <h4 class="bg-white mx-4 px-4">問題</h4>    
            <a class="mx-4 h4" v-on:click="go">問券回饋</a>     
            <h4 class="mx-4">統計</h4>    
        </nav>
        <nav v-else-if="$route.name === 'c'" class="d-flex">
            <h4 class="mx-4">問券</h4>    
            <h4 class="mx-4">問題</h4>    
            <a class="bg-white mx-4 px-4 h4">問券回饋</a>      
            <h4 class="mx-4">統計</h4>      
        </nav>
        <nav v-else-if="$route.name === 'd'" class="d-flex">
            <h4 class="mx-4">問券</h4>    
            <h4 class="mx-4">問題</h4>    
            <a class="mx-4 h4" v-on:click="go">問券回饋</a>     
            <h4 class="bg-white mx-4 px-4">統計</h4>      
        </nav>
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
    .murasaki{
    background-color: rgb(143, 77, 143);
}

</style>