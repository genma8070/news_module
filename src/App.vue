<script>
import { RouterView } from 'vue-router';
import FooterView from "./components/Footer.vue";
import HeaderView from "./components/HomeHeader.vue";


export default {
  components: {
    HeaderView,
    FooterView
  }
}
</script>

<template>
  <HeaderView />
  <RouterView />
  <FooterView />
</template>

<style>
</style>
