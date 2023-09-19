<script>
export default {
  props: [
    "property2",
    "index"
  ],
  emits: [
    'getSubTarget',
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
    getUrl(subId) {
      return '/subcategory/update/' + subId;
    },
    getEditUrl(questionnaireId) {
      return '/edit/' + questionnaireId;
    },
    sendId(property2) {
      this.$emit('goSubTarget', property2);
    },
    sendSubData(property2) {
      this.$emit('getSubTarget', property2);
      // console.log(property)
    },
   
  
  },
  mounted() {
  }
};
</script> 

<template>
  <tr class="fw-bold">
    <td v-if="property2.news == 0"><input type="checkbox" name="news" @change="sendSubData(property2)" :value="property2"></td>
    <td v-else></td>
    <td>{{ index + 1 }}</td>
    <td>{{ property2.subCategoryName }}({{ property2.news }})</td>
    <td><a :href="getUrl(property2.subId)" class="btn btn-secondary">更新</a></td>
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
  