<script>
import HeaderView from '../components/Header.vue';

export default {
    components: {
        HeaderView

    },

    data() {
        return {
            vh: 0,
            title: "",
            mainC: [],
            subC: [],
            subC: "",
            text: "",
            mainI: "",
            subI: ""

        }
    },
    methods: {
        mainMove() {
            this.subI = ""
            this.getSub();
        },
        getMain() {
            fetch("http://localhost:8080/find_mainC", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },

            })
                .then(function (response) {
                    return response.json();
                })
                .then((data) => {
                    this.mainC = data.list2;
                    // console.log(this.mainI)
                })
                .catch(function (error) {
                    console.log(error)
                })

        }, getSub() {
            let body = {
                "fatherId": this.mainI,
            }
            fetch("http://localhost:8080/find_subC", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body)
            })
                .then(function (response) {
                    return response.json();
                })
                .then((data) => {
                    this.subC = data.list
                    this.subI = ""
                    // console.log(this.mainI)
                })
                .catch(function (error) {
                    console.log(error)
                })

        },
        addNews() {
            let body = {
                "mainCategory": this.mainI,
                "subCategory": this.subI,
                "title": this.title,
                "text": this.text,
            }
            fetch("http://localhost:8080/new_news", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body)
            })
                .then(function (response) {
                    return response.json();
                })
                .then((data) => {
                    window.alert(data.message);
                })
                .catch(function (error) {
                    console.log(error)
                })

        },


    },
    mounted() {
        this.getMain();
        this.vh = document.documentElement.scrollHeight - 72 - 85;
        document.getElementById("wrap").style.height = this.vh.toString() + "px";

    }
}
</script>
<template>
    <div id="wrap" class="d-flex flex-column mb-4 ">
        <h1 class="text-center mt-4">新增最新消息</h1>
        <div class="d-flex mt-5 mx-5 border border-dark border-2 justify-content-center">
            <div class="row d-flex flex-column mx-3 my-2">
                <div class="col d-flex">
                    <h4>新聞標題:</h4>
                    <input v-model="title" style="height: 25px; width: 338px;" class="ms-2" type="text">
                </div>
                <div class="col d-flex">
                    <h4>新聞內容:</h4>
                    <input v-model="text" style="height: 25px; width: 338px;" class="ms-2" type="text">
                </div>
                <div class="col d-flex">
                    <h4>父分類:</h4>
                    <select v-model="mainI" @change="mainMove" style="height: 25px;" class="ms-2" name="main" id="">
                        <option value="" selected>--請選擇父分類--</option>
                        <option v-for="data in mainC" :value="data.mainId">{{ data.mainTitle }}</option>
                    </select>
                    <h4 class="ms-1">子分類:</h4>
                    <select v-show="mainI > 0" @change="search" v-model="subI" style="height: 25px;" class="ms-2" name="sub"
                        id="">
                        <option value="" selected>--請選擇子分類--</option>
                        <option v-for="subData in subC" :value="subData.subId">{{ subData.subTitle }}</option>
                    </select>
                </div>
            </div>
            <div class="mt-5">
                <button @click="addNews" type="button">新增</button>
            </div>
        </div>

    </div>
</template>
<style lang="scss" scoped>
.mid {
    text-align: center;
}

.page {
    margin-top: 240px;

}

.Result {
    justify-content: space-around;
    text-align: center;
    overflow: auto;
    margin-bottom: -200px;
    height: 300px;
    /* 自定義高度，根據需要調整 */
}
</style>