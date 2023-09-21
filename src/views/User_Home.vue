<script>
import Pagination from '../components/Pagination.vue';
import Result from '../components/Result_User.vue';
export default {
    components: {
        Pagination,
        Result
    },

    data() {
        return {
            vh: 0,
            contentCount: 10,
            itemsPerPage: 10,
            currentPage: 1,
            items: [

            ],
            id: [

            ],
            title: "",
            startTime: "",
            endTime: "",
            mainC: [],
            subC: [],
            text: "",
            mainI: "",
            subI: "",
            mainT: '',
            subT: "",
            time: "",
            sort: ""
        }
    },
    methods: {

        handlePageChanged(page) {
            // 處理分頁切換的邏輯
            this.currentPage = page;
            this.find()
            // 更新相應的內容
        },
        find() {
            let body = {
                "index": (this.currentPage - 1) * this.itemsPerPage,
                "items": this.itemsPerPage
            }

            fetch("http://localhost:8080/user_get_all", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            })
                .then(function (response) {
                    return response.json();
                })
                .then((data) => {
                    if (data.message != null) {
                        if (!data.messageType) {
                            window.alert(data.message)
                        }
                    }
                    // console.log(data)
                    this.contentCount = data.list.length
                    fetch("http://localhost:8080/user_find_all_news", {
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
                            this.items = data.list

                        })
                        .catch(function (error) {
                            console.log(error)
                        })
                })
                .catch(function (error) {
                    console.log(error)
                })
        },
    },
    mounted() {
        this.find()

        // 設定高度
        this.vh = document.documentElement.scrollHeight - 72 - 85;
        document.getElementById("wrap").style.height = this.vh.toString() + "px";

    }
}
</script>
<template>
    <div id="wrap" class="d-flex flex-column mb-4 mt-2">
        <div class="Result">
            <table class="table table-danger table-striped table-bordered border border-danger">
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>メインカテゴリ</th> <!-- 空白列 -->
                        <th>サブカテゴリ</th>
                        <th>タイトル</th>
                        <th>発表日時</th>
                    </tr>
                </thead>

                <tbody>
                    <!-- 使用子元件並傳遞相關資料 -->
                    <Result v-for="(property, index) in items" v-bind:key="property" v-bind:property="property"
                        v-bind:index="index" v-bind:page="currentPage" />
                </tbody>

            </table>
        </div>

        <div class="outSide">
            <pagination :contentCount="contentCount" :itemsPerPage="itemsPerPage" @page-changed="handlePageChanged"
                class="mx-auto mb-n5 page"></pagination>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.mid {
    text-align: center;
}

.outSide {
    position: relative;
    left: 15%;
    top: 55%;
    width: 70%;
    height: 15%;
    // justify-content: center;
    // align-items: center;
    // text-align: center;
    overflow-x: auto;

    .page {
        // margin-top: 200px;

    }
}


.Result {
    height: 80%;
    justify-content: space-around;
    text-align: center;
    overflow: auto;
    margin-top: 10px;
    margin-bottom: -200px;
    padding-top: 5px;

    /* 自定義高度，根據需要調整 */
}

.float-btn {
    display: inline-block;
    padding: 7px 15px;
    background-color: #751bb2;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 20px;
    cursor: pointer;
    transition: transform 0.3s, background-color 0.3s, box-shadow 0.3s;
}

.float-btn:hover {
    background-color: #bd87c4;
    transform: translateY(-5px);
    /* 向上浮动效果 */
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    /* 阴影效果 */
}

.float-btn:active {
    background-color: #8a16ad;
    transform: translateY(0);
    /* 按下特效 */
    box-shadow: none;
    /* 按下时移除阴影 */
}
</style>