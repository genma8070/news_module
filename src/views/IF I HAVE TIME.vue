<script>
import Pagination from '../components/Pagination.vue';
import Result from '../components/Result_Front.vue';
import EditView from "../views/Edit.vue";
export default {
    components: {
        Pagination,
        Result,
        EditView
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
            endTime: ""

        }
    },
    methods: {
        getId(value) {
            const index = this.id.findIndex(i => i === value.questionnaireId);
            if (index !== -1) {
                this.id.splice(index, 1); // 从数组中删除找到的元素
            } else {
                this.id.push(value.questionnaireId)
            }
        },
        deleteEnquete() {
            // 在父组件中执行方法  
            let body = {

                "id": this.id
            }
            fetch("http://localhost:8080/delete_enquete", {
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
                    this.id = []
                    this.find();

                })
                .catch(function (error) {
                    console.log(error)
                })


        },
        handlePageChanged(page) {
            // 處理分頁切換的邏輯

            this.currentPage = page;
            this.find()
            // 更新相應的內容
        },
        viewStatistics() {
            // 觸發查看統計的動作，你可以根據自己的需求進行處理
        },

        find() {
            let body = {
                "index": (this.currentPage - 1) * 10
            }

            fetch("http://localhost:8080/find_all", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },

            })
                .then(function (response) {
                    return response.json();
                })
                .then((data) => {

                    this.contentCount = data.list.length
                    fetch("http://localhost:8080/find_all_enquete", {
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
                            this.items = data

                        })
                        .catch(function (error) {
                            console.log(error)
                        })
                })
                .catch(function (error) {
                    console.log(error)
                })
        },
        search() {
            let body = {
                "title": this.title,
                "startTime": this.startTime,
                "endTime": this.endTime,
                "index": this.currentPage - 1
            }
            fetch("http://localhost:8080/find_questionnaire_by_title_or_date", {
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
                    if (data.message) {
                        window.alert(data.message)
                    }
                    this.items = data
                })
                .catch(function (error) {
                    console.log(error)
                })

        },
        add() {
            this.$router.push("/add/a");
        },
        compare() {
            if (this.endTime < this.startTime) {
                window.alert("結束時間不可")
            }
        }

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
    <div id="wrap" class="d-flex flex-column mb-4 ">
        <div class="d-flex mt-1 mx-5 border border-dark border-2 justify-content-center">
            <div class="row d-flex flex-column mx-3 my-2">
                <div class="col d-flex">
                    <h4>標題關鍵字:</h4>
                    <input v-model="title" style="height: 25px; width: 338px;" class="ms-2" type="text">
                </div>
                <div class="col d-flex">
                    <h4>發布日期:</h4>
                    <input v-model="startTime" style="height: 25px;" class="ms-2" type="date" name="" id="">
                    <input v-model="endTime" style="height: 25px;" class="ms-2" type="date" name="" id="">
                </div>
            </div>
            <div class="mt-5">
                <button @click="search" type="button">查詢</button>
            </div>
        </div>
        <div class="tab-wrap">
            <input id="TAB-01" type="radio" name="TAB" class="tab-switch" checked="checked"><label class="tab-label"
                for="TAB-01">カテゴリ①</label>
            <div class="tab-content">

                <div class="tab-wrap">
                    <input name="TAB-1" class="tab-switch" id="TAB-1-1" type="radio" checked="checked"><label
                        class="tab-label" for="TAB-1-1">新着記事</label>
                    <div class="tab-content">
                        ↓ここにカテゴリ①の新着記事を表示↓

                    </div>

                    <input name="TAB-1" class="tab-switch" id="TAB-1-2" type="radio"><label class="tab-label"
                        for="TAB-1-2">人気記事</label>
                    <div class="tab-content">
                        ↓ここにカテゴリ①人気記事を表示↓

                    </div>
                </div>
            </div>


            <input id="TAB-02" type="radio" name="TAB" class="tab-switch"><label class="tab-label"
                for="TAB-02">カテゴリ②</label>
            <div class="tab-content">

                <div class="tab-wrap">
                    <input name="TAB-2" class="tab-switch" id="TAB-2-1" type="radio" checked="checked"><label
                        class="tab-label" for="TAB-2-1">新着記事</label>
                    <div class="tab-content">
                        ↓ここにカテゴリ②の新着記事を表示↓

                    </div>

                    <input name="TAB-2" class="tab-switch" id="TAB-2-2" type="radio"><label class="tab-label"
                        for="TAB-2-2">人気記事</label>
                    <div class="tab-content">
                        ↓ここにカテゴリ②の人気記事を表示↓

                    </div>
                </div>

            </div>

            <input id="TAB-03" type="radio" name="TAB" class="tab-switch"><label class="tab-label"
                for="TAB-03">カテゴリ③</label>
            <div class="tab-content">

                <div class="tab-wrap">
                    <input name="TAB-3" class="tab-switch" id="TAB-3-1" type="radio" checked="checked"><label
                        class="tab-label" for="TAB-3-1">新着記事</label>
                    <div class="tab-content">
                        ↓ここにカテゴリ③の新着記事を表示↓

                    </div>

                    <input name="TAB-3" class="tab-switch" id="TAB-3-2" type="radio"><label class="tab-label"
                        for="TAB-3-2">人気記事</label>
                    <div class="tab-content">
                        ↓ここにカテゴリ③の人気記事を表示↓

                    </div>
                </div>



            </div>
        </div>

        <div class="Result">
            <table class="table table-dark table-striped">
                <thead>
                    <tr>
                        <th>分類1</th> <!-- 空白列 -->
                        <th>分類2</th>
                        <th>標題</th>
                        <th>發布時間</th>
                    </tr>
                </thead>

                <tbody>
                    <!-- 使用子元件並傳遞相關資料 -->
                    <Result v-for="(property, index) in items.list" @f-change="getId" v-bind:key="property"
                        v-bind:property="property" v-bind:index="index" />
                </tbody>

            </table>
        </div>
        <pagination :contentCount="contentCount" :itemsPerPage="itemsPerPage" @page-changed="handlePageChanged"
            class="mx-auto page"></pagination>


    </div>
</template>
<style lang="scss" scoped>
/**************************
 タブ切り替え
***************************/
.tab-wrap {
    display: flex;
    flex-wrap: wrap;
    margin: 5px 0;
}

.tab-label {
    color: White;
    background-color: lightgray;
    text-align: center;
    padding: .5em 1em;
    order: -1;
    position: relative;
    z-index: 1;
    cursor: pointer;
    flex: 1;
}

.tab-label:not(:last-of-type) {
    margin-right: 5px;
}

.tab-content {
    width: 100%;
    height: 0;
    overflow: hidden;
    opacity: 0;
}

/* アクティブなタブ */
.tab-switch:checked+.tab-label {
    background-color: #999fad;
    /*背景色*/
}

.tab-switch:checked+.tab-label:after {
    content: "";
    position: absolute;
    top: 100%;
    left: calc(50% + 5px);
    margin-left: -15px;
    border: 10px solid transparent;
    border-top: 10px solid #999fad;
    width: 0;
    height: 0;
}

.tab-switch:checked+.tab-label+.tab-content {
    height: auto;
    overflow: auto;
    padding: 15px 0 0 0;
    opacity: 1;
    transition: .5s opacity;
}

/* ラジオボタン非表示 */
.tab-switch {
    display: none;
}

.mid {
    text-align: center;
}

.page {
    margin-top: 200px;

}

.Result {
    justify-content: space-around;
    text-align: center;
    overflow: auto;
    margin-bottom: -200px;
    padding-top: 5px;

    /* 自定義高度，根據需要調整 */
}</style>