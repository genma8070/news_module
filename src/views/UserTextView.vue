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
            subTitle: "",
            text: "",
            startTime: "",
            endTime: "",
            data: [],
            now: Date.now(),
            time: ""

        }
    },
    methods: {
        formatter() {
            this.time = (this.data.openDate).replace('T', ' ')
        },
        get() {
            let body = {
                "newsId": this.$route.params.Id
            }
            fetch("http://localhost:8080/find_full_news_by_id", {
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
                    this.data = data;
                    this.formatter()

                    // console.log(data)
                })
                .catch(function (error) {
                    console.log(error)
                })
        },
        getUrl(newsId) {
            return '/update/' + newsId;
        },

    },

    mounted() {
        this.get();

        this.vh = document.documentElement.scrollHeight - 72 - 85;
        document.getElementById("wrap").style.height = this.vh.toString() + "px";

    }
}
</script>
<template>
    <div id="wrap" class="d-flex flex-column mb-4 ">
        <HeaderView></HeaderView>
        <div class="d-flex justify-content-around mt-2">
            <a href="/user_home" class="btn btn-secondary fw-bold me-3 mb-5 mt-4">前のページ</a>
            <!-- <h1 class="text-center ms-n5">{{ data.title }}</h1> -->
            <div class="d-flex flex-column text-center me-4 ms-n5">
                <span class="h1">{{ data.title }}</span>
                <span class="h3">{{ data.subTitle }}</span>
            </div>
            <div class="ml-5 me-5"></div>
        </div>
        <div class="d-flex justify-content-between my-n1 mt-n3 h5">
            <div class="ms-5">

            </div>
            <div class="me-5 d-flex ">
                <p> メインカテゴリ: {{ data.mainCategoryName }}</p>
                <p class="ms-3"> サブカテゴリ: {{ data.subCategoryName }}</p>
            </div>
        </div>
        <div class="d-flex justify-content-between my-n2 mb-n3 h5">
            <div class="ms-5">

            </div>
            <div class="me-5">
                <p> 発表日時: {{ time }}</p>
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