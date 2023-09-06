<script>
export default {
  props: [
    "property",
    "index"
  ],
  emits: [
    'getTarget',
    'goTatget'
  ],
  data() {
    return {
      ed: 0,
      nd: 0,
      time: "",
      name:""

    };
  },
  methods: {
    getUrl(mainId) {
      return '/category/update/' + mainId;
    },
    getEditUrl(questionnaireId) {
      return '/edit/' + questionnaireId;
    },
    sendId(property) {
      this.$emit('goTarget', property);
    },
    sendData(property) {
      this.$emit('getTarget', property);
      // console.log(property)
    }
  
  
  },
  mounted() {
  
  }
};
</script> 

<template>
  <tr class="fw-bold">
    <td v-if="property.news == 0"><input type="checkbox" name="news" @change="sendData(property)" :value="property"></td>
    <td v-else></td>
    <td>{{ property.mainTitle }}({{ property.news }})</td>
    <td><a :href="getUrl(property.mainId)" class="btn btn-secondary">詳細</a></td>
  </tr>
</template>
  
 
<style lang="scss" scoped>
.aa:link {
  //設定還沒有瀏覽過的連結
  text-decoration: none;
  background-color: #ffffff;
  color: black;
  border-radius: 5px;
}

.aa:hover {
  //設定滑鼠移經的連結
  text-decoration: none;
  background-color: #e18b8b;
  color: black;
  border-radius: 5px;

}

.aa:active {
  //設定正在點選的連結
  text-decoration: none;
  background-color: rgb(255, 68, 68);
  color: black;
  border-radius: 5px;


}

.aa:visited {
  //設定還沒有瀏覽過的連結
  text-decoration: none;
  background-color: #ffffff;
  color: black;
  border-radius: 5px;
}


/* 在這裡放置子元件的樣式 */
</style>
  