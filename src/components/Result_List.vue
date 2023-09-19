<script>
export default {
  props: [
    "property",
    "index",
    "page"
  ],
  emits: [
    'getTarget',
    'goTatget'
  ],
  data() {
    return {
      ed: 0,
      nd: 0,
      time: ""

    };
  },
  methods: {
    getUrl(newsId) {
      return '/Text/' + newsId;
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
    },
    formatter() {
      if (this.property.openDate != null) {
        this.time = this.property.openDate.replace('T', ' ')
      } else {
        this.time = '未定'
      }

    }
  },
  mounted() {
    // console.log(this.property)
    this.ed = new Date(this.property.endTime).getTime()
    this.nd = Date.now()
    this.formatter()
  }
};
</script> 

<template>
  <tr class="fw-bold">
    <td>{{ index + 1 + (page - 1) * 10  }}</td>
    <td>{{ property.mainCategoryName }}</td>
    <td>{{ property.subCategoryName }}</td>
    <td>{{ property.title }}</td>
    <td>{{ time }}</td>
    <td v-if="property.open == 1">開放中</td>
    <td v-else-if="property.open == 0">未開放</td>
    <td v-else="property.open == 2">隱藏中</td>
    <td><a :href="getUrl(property.newsId)" class="btn btn-secondary">詳細</a></td>
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
  