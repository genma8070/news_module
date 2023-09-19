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
            subTitle: '',
            mainI: "",
            subI: "",
            openDate: "",
            session: {

                mainI: '',
                subI: '',
                title: '',
                subTitle: '',
                text: '',
                openDate: '',
                mainN: '',
                subN: ''

            }
        }
    },
    methods: {
        mainMove() {
            this.subI = null
            this.findSub();
            this.changeMainT();
        },
        subMove(subI) {
            this.subC.forEach(element => {
                if (element.subId == subI) {
                    this.mainI = element.mainId;
                    this.findSub(subI);
                }
                return
            });
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

        }, findSub(subI) {
            let body = {
                "mainId": this.mainI,
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
                    if (subI != null) {
                        this.subI = subI
                    } else {
                        this.subI = ""
                    }

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
                "subTitle": this.subTitle,
                "subCategoryName": this.subCategoryName,
                "text": this.text,
                "openDate": this.openDate
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
                    if (data.messageType) {
                        window.alert(data.message);
                        sessionStorage.clear()

                    }
                    if (!data.messageType) {
                        window.alert(message);
                        this.cancel();
                    }
                })
                .catch(function (error) {
                    console.log(error)
                })

        },
        getSub() {
            fetch("http://localhost:8080/get_subC", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },

            })
                .then(function (response) {
                    return response.json();
                })
                .then((data) => {

                    this.subC = data.list;

                })
                .catch(function (error) {
                    console.log(error)
                })
        }, changeMainT() {
            const selectedMain = this.mainC.find(data => data.mainId === this.mainI);
            if (selectedMain) {
                this.mainT = selectedMain.mainCategoryName;
            } else {
                this.mainT = ''; // 清空 mainT 如果没有选中的主分类
                this.getSub();
            }
            // console.log(this.mainT)
        },
        p() {
            console.log(this.openDate)
        },
        getMainName(value) {
            // console.log(this.mainC)
            const index = this.mainC.findIndex(i => i.mainId === value);
            if (index !== -1) {
                // console.log(this.mainC)
                this.session.mainCategoryName = this.mainC[index].mainCategoryName;
            }
        }, getSubName(value) {
            // console.log(value)
            const index = this.subC.findIndex(i => i.subId === value);
            if (index !== -1) {

                this.session.subCategoryName = this.subC[index].subCategoryName;
            }
        },
        addPerview() {
            this.session.title = this.title;
            this.session.subTitle = this.subTitle;
            this.session.mainI = this.mainI;
            this.session.subI = this.subI;
            this.session.subCategoryName = this.subCategoryName;
            this.session.text = this.text;
            this.session.openDate = this.openDate;
            this.getMainName(this.mainI)
            this.getSubName(this.subI)
            sessionStorage.setItem("session", JSON.stringify(this.session));
            this.$router.push('/perview/0')
        },
        cancel() {
            this.session = JSON.parse(sessionStorage.getItem("session"));
            this.title = this.session.title;
            this.subTitle = this.session.subTitle;
            this.mainI = this.session.mainI;
            this.subI = this.session.subI;
            this.text = this.session.text;
            this.openDate = this.session.openDate;
        },
        wordsTotal() {

            let total = document.getElementById('userInput').value.length;

            document.getElementById('display').innerHTML = total;

        }

    },
    mounted() {
        this.getMain();
        this.getSub();
        if (sessionStorage.getItem("session") != null) {

            this.cancel()
            // console.log(this.title)
        }
        // this.openDate = Date.now();
        this.vh = document.documentElement.scrollHeight - 72 - 85;
        document.getElementById("wrap").style.height = this.vh.toString() + "px";

    }
}
</script>
<template>
    <div id="wrap" class="d-flex flex-column mb-4 ">
        <div class="d-flex justify-content-around mt-2">
            <a href="/" class="btn btn-outline-info fw-bold me-3 mb-5 mt-4">上一頁</a>
            <!-- <h1 class="text-center ms-n5">{{ data.title }}</h1> -->
            <div class="d-flex flex-column text-center me-4 ms-n5">
                <span class="h1">新增最新消息</span>

            </div>
            <div class="ml-5 me-5"></div>
        </div>

        <div class="d-flex mx-5 border border-dark border-2 justify-content-center">
            <div class="row d-flex flex-column pt-2 mx-3 my-2">
                <div class="col d-flex">
                    <h4>新聞標題:</h4>
                    <input v-model="title" style="height: 25px; width: 338px;" class="ms-2" type="text">
                </div>
                <div class="col d-flex">
                    <h4>副標題:</h4>
                    <input v-model="subTitle" style="height: 25px; width: 338px;" class="ms-2" type="text">
                </div>
                <div class="col d-flex">
                    <h4>新聞內容:</h4>
                    <textarea id="userInput" @keyup="wordsTotal" v-model="text" style="height: 150px; width: 338px;"
                        class="mb-1 ms-2"></textarea>
                </div>
                <div class="text-center mb-1">字數統計：<span id="display">0</span><span>/500</span></div>

                <div class="col d-flex">
                    <h4>父分類:</h4>
                    <select v-model="mainI" @change="mainMove" style="height: 25px;" class="ms-2" name="main" id="">
                        <option value="" selected>--請選擇父分類--</option>
                        <option v-for="data in mainC" :value="data.mainId">{{ data.mainCategoryName }}</option>
                    </select>
                    <h4 class="ms-1">子分類:</h4>
                    <select @change="subMove(subI)" v-model="subI" style="height: 25px;" class="ms-2" name="sub" id="">
                        <option value="" selected>--請選擇子分類--</option>
                        <option v-for="subData in subC" :value="subData.subId">{{ subData.subCategoryName }}</option>
                    </select>
                </div>
                <div class="col d-flex">
                    <h4>預定開放時間(預設現在): </h4>
                    <input type="datetime-local" v-model="openDate" v-on:change="p" class="ms-2 mt-1" style="height: 25px;"
                        name="open" id="open">
                </div>
            </div>
            <div class="mt-5 ms-5 me-n3">
                <a @click="addPerview" class="ms-5 me-n5 mt-4 align-middle btn btn-dark">新增</a>
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