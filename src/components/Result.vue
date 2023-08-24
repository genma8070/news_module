<script>
export default {
  props: [
    "property",
    "index"
  ],
  emits: ['getTarget'],
  data() {
    return {
      ed: 0,
      nd: 0,

    };
  },
  methods: {
    getEditUrl(questionnaireId) {
      return '/edit/' + questionnaireId;
    },
    sendData(property) {
      this.$emit('getTarget', property);
      // console.log(property)
    },
  },
  mounted() {
    // console.log(this.property)
    this.ed = new Date(this.property.endTime).getTime()
    this.nd = Date.now()
  }
};
</script> 

<template>
  <tr class="fw-bold">
    <td><input type="radio" name="news" @change="sendData(property)" :value="property"></td>
    <td>{{ property.mainCategoryName }}</td>
    <td>{{ property.subCategoryName }}</td>
    <td>{{ property.title }}</td>
    <td v-if="property.updataDate != null">{{ property.updataDate }}</td>
    <td v-else>{{ property.creatDate }}</td>
    <td v-if="property.open">開放中</td>
    <td v-else>隱藏中</td>
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
  