<script>
export default {
  
    data() {
        return {
        
        };
    },
    methods: {
        jump(event) {
      event.preventDefault(); // 阻止链接的默认行为
        this.$router.push('/'); // 导航到f_home页
    }
  
    }
}
</script>
<template>
    <footer class="murasaki p-4 text-center">
        <a v-on:click="jump" class="text-white fs-6 m-0">^^</a>
    </footer>
</template>

<style lang="scss" scoped>
.murasaki{
    background-color: rgb(143, 77, 143);
}

a {
  text-decoration: none; /* 移除下划线 */
  color: inherit; /* 继承父元素的文本颜色 */
}
</style>