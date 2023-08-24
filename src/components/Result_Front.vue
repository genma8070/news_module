<script>
export default {
  props: [
    "property",
    "index",
  ],
  emits: ['fChange'],
  data() {
    return {
      ed: 0,
      nd: 0,

    };
  },
  methods: {
    getEditUrl(questionnaireId) {
      return '/ans/' + questionnaireId;
    },
    sendData(value) {
      this.$emit('f-change', value);
    }, getUrl(newsId) {
      return '/Text/' + newsId;
    },

  },
  mounted() {
    this.ed = new Date(this.property.endTime).getTime()
    this.nd = Date.now()
  }


};
</script>

<template>
  <tr class="fw-bold">
    <td>{{ property.mainCategoryName }}</td>
    <td>{{ property.subCategoryName }}</td>
    <td><a :href="getUrl(property.newsId)" class="aa">{{ property.title }}</a></td>
    <td v-if="property.updataDate != null">{{ property.updataDate }}</td>
    <td v-else>{{ property.creatDate }}</td>
  </tr>
</template>
  
 
<style lang="scss" scoped>
.aa:link {
  //設定還沒有瀏覽過的連結
  text-decoration: none;
  // background-color: #f841be;
  color: black;
  border-radius: 5px;

}

.aa:hover {
  //設定滑鼠移經的連結
  text-decoration: none;
  background-color: #eb6a86;
  transition: 0.2s;
  padding: 3px 5px;
  color: black;
  border-radius: 5px;

}

.aa:active {
  //設定正在點選的連結
  text-decoration: none;
  // background-color: rgb(255, 68, 68);
  color: black;
  border-radius: 5px;


}

.aa:visited {
  //設定還沒有瀏覽過的連結
  text-decoration: none;
  // background-color: #ffffff;
  color: black;
  border-radius: 5px;
}


/* 在這裡放置子元件的樣式 */
</style>
  