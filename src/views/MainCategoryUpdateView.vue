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
            mainT: "",
            subI: ""

        }
    },
    methods: {
        get() {
            let body = {
                "mainId": this.$route.params.Id
            }
            fetch("http://localhost:8080/find_main_by_id", {
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

                    this.title = data.main.mainCategoryName;

                })
                .catch(function (error) {
                    console.log(error)
                })
        },
        updata() {
            let body = {
                "mainId": this.$route.params.Id,
                "mainCategoryName": this.title,
            }
            fetch("http://localhost:8080/add_main", {
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
                        this.backToLsit();
                    }
                    if (!data.messageType) {
                        window.alert(data.message);
                    }
                })
                .catch(function (error) {
                    console.log(error)
                })
        },
        backToLsit() {
            this.$router.push('/maincategory/management')
        },



    },
    mounted() {
        this.get()
        this.vh = document.documentElement.scrollHeight - 72 - 85;
        document.getElementById("wrap").style.height = this.vh.toString() + "px";

    }
}
</script>
<template>
    <div id="wrap" class="d-flex flex-column mb-4 ">
        <div class="d-flex justify-content-around mt-3">
            <input type="button" @click="backToLsit" class="btn btn-outline-info mx-n5" value="キャンセル">
            <h1 class="mx-n5 ms-5">メインカテゴリ更新</h1>
            <p class="mx-2"></p>
        </div>
        <div class="d-flex mt-5 mx-5 border border-dark border-2 justify-content-center">
            <div class="row d-flex flex-column mx-3 my-2">
                <div class="col d-flex">
                    <h4>カテゴリ名称:</h4>
                    <input v-model="title" style="height: 25px; width: 338px;" class="ms-2" type="text">
                </div>
            </div>
            <div class="mt-2">
                <button @click="updata" type="button">更新</button>
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