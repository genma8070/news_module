<script>
import { bottom } from '@popperjs/core';
import HeaderView from '../components/Header.vue';

export default {
    components: {
        HeaderView,
        bottom
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
            now: Date.now(),
            time: "",
            data: []

        }
    },
    methods: {
        formatter() {
            if (this.data.openDate != null && this.data.openDate != '') {
                this.time = (this.data.openDate).replace('T', ' ')
            } else {
                const currentDate = new Date();
                const year = currentDate.getFullYear();
                const month = String(currentDate.getMonth() + 1).padStart(2, '0');  // 月份從0開始，需要加1
                const day = String(currentDate.getDate()).padStart(2, '0');
                const hours = String(currentDate.getHours()).padStart(2, '0');
                const minutes = String(currentDate.getMinutes()).padStart(2, '0');
                const seconds = String(currentDate.getSeconds()).padStart(2, '0');

                this.time = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
                this.data.openDate = this.time.replace(' ', 'T');
            }
        },
        get() {
            if (this.$route.params.Id == 0) {
                this.data = JSON.parse(sessionStorage.getItem("session"))
            } else {
                this.data = JSON.parse(sessionStorage.getItem("update"))
            }

            // console.log(this.data)
        },
        getUrl(newsId) {
            return '/updata/' + newsId;
        },
        addNews() {
            let body = {
                "mainCategory": this.data.mainI,
                "subCategory": this.data.subI,
                "title": this.data.title,
                "subTitle": this.data.subTitle,
                "subCategoryName": this.data.subCategoryName,
                "text": this.data.text,
                "openDate": this.data.openDate
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
                    // console.log(data)
                    if (data.messageType) {
                        window.alert(data.message);
                        sessionStorage.clear();
                        this.$router.push('/')
                    }
                    if (!data.messageType) {
                        window.alert(data.message);
                        this.backToAdd();
                    }
                })
                .catch(function (error) {
                    console.log(error)
                })

        },
        backToAdd() {
            this.$router.push("/news/add")
        },
        backToUpdate() {
            this.$router.push("/update/" + this.$route.params.Id)
        },
        update() {
            let body = {
                "newsId": this.$route.params.Id,
                "mainCategory": this.data.mainI,
                "subCategory": this.data.subI,
                "title": this.data.title,
                "subTitle": this.data.subTitle,
                "text": this.data.text,
                "openDate": this.data.openDate
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
                        sessionStorage.clear();
                        this.$router.push('/')
                    }
                    if (!data.messageType) {
                        window.alert(data.message);
                        this.backToUpdate();
                    }
                })
                .catch(function (error) {
                    console.log(error)
                })
        },


    },
    mounted() {
        this.get();
        this.formatter();
        console.log(this.data.openDate)
        this.vh = document.documentElement.scrollHeight - 72 - 85;
        document.getElementById("wrap").style.height = this.vh.toString() + "px";

    }
}
</script>
<template>
    <div id="wrap" class="d-flex flex-column mb-4 ">
        <HeaderView></HeaderView>
        <div class="d-flex justify-content-around mt-2">
            <a v-if="this.$route.params.Id != 0" @click="backToUpdate" class="btn btn-secondary fw-bold mb-4">返回</a>
            <a v-else @click="backToAdd" class="btn btn-secondary fw-bold mb-4">返回</a>
            <h1 class="text-center">{{ data.title }}</h1>
            <input v-if="this.$route.params.Id != 0" type="button" value="送出" class="btn  btn-secondary fw-bold mb-4"
                @click="update">
            <input v-else type="button" value="送出" class="btn  btn-secondary fw-bold mb-4" @click="addNews">
        </div>
        <div class="d-flex justify-content-around mt-n4 mb-3">
            <h3 class="text-center">{{ data.subTitle }}</h3>
        </div>
        <div class="d-flex justify-content-between my-n1 mt-n3 h5">
            <div class="ms-5">

            </div>
            <div class="me-5 d-flex ">
                <p> 主分類: {{ data.mainCategoryName }}</p>
                <p class="ms-3"> 副分類: {{ data.subCategoryName }}</p>
            </div>
        </div>
        <div class="d-flex justify-content-between my-n2 mb-n3 h5">
            <div class="ms-5">

            </div>
            <div class="me-5">
                <p> 開放時間: {{ time }}</p>
            </div>
        </div>

        <textarea class="d-flex h-100 mt-1 mx-5 border border-dark border-2 justify-content-center px-3" disabled>
                {{ data.text }}
                
        </textarea>

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