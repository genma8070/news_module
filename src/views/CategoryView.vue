<script>
import Pagination from '../components/Pagination.vue';
import Result from '../components/Result_List.vue';
export default {
    components: {
        Pagination,
        Result,
    },

    data() {
        return {
            vh: 0,
            contentCount: 10,
            itemsPerPage: 10,
            currentPage: 1,
            items: [
            ],
            id: null,
            open: "",
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
            isSearch: true,
            deleteId: [],
            mainValue: "",
            subValue: "",
            sort: true,
            keyForPagination:Date.now()

        }
    },
    methods: {
        getId(value) {
            // console.log(value)
            const index = this.deleteId.findIndex(i => i === value.newsId);
            if (index !== -1) {
                this.deleteId.splice(index, 1); // 从数组中删除找到的元素
            } else {
                this.deleteId.push(value.newsId)
            }
            console.log(this.deleteId)
        },
        subMove(subI) {
            if (subI == "") {
                this.goSearch();
                return
            }
            this.subC.forEach(element => {
                if (element.subId == subI) {
                    this.mainI = element.mainId;
                    this.findSub(subI);
                    this.goSearch();
                }
                return
            });
        },
        deleteNews() {
            let body = {
                "list": this.deleteId
            }
            fetch("http://localhost:8080/delete_news", {
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
                        this.deleteId = [];
                    }
                    if (!data.messageType) {
                        window.alert(data.message);
                    } this.find();
                })
                .catch(function (error) {
                    console.log(error)
                })
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
                    // console.log(this.mainC)

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
                    // console.log(data)

                })
                .catch(function (error) {
                    console.log(error)
                })
        },
        changeMainT() {
            const selectedMain = this.mainC.find(data => data.mainId === this.mainI);
            if (selectedMain) {
                this.mainT = selectedMain.mainCategoryName;
            } else {
                this.mainT = ''; // 清空 mainT 如果没有选中的主分类
                this.getSub();
            }
            // console.log(this.mainT)
        },
        findSub(subI) {
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

                    // console.log(this.mainT)
                })
                .catch(function (error) {
                    console.log(error)
                })

        },
        handlePageChanged(page) {
            this.currentPage = page;
            this.find()
        },
        handlePageChangedS(page) {
            this.currentPage = page;
            this.search()
        },
        find() {
            let body = {
                "index": (this.currentPage - 1) * this.itemsPerPage,
                "items": this.itemsPerPage,
                "sort": true
            }
            fetch("http://localhost:8080/get_all", {
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
                    if (data.message != null) {
                        if (!data.messageType) {
                            window.alert(data.message);
                        }
                    }
                    // console.log(data)
                    this.contentCount = data.list.length
                    fetch("http://localhost:8080/find_all_news", {
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
                            this.isSearch = false

                        })
                        .catch(function (error) {
                            console.log(error)
                        })
                })
                .catch(function (error) {
                    console.log(error)
                })
        },
        goSearch() {
            this.currentPage = 1;
            this.keyForPagination = Date.now();
            this.search();
        },
        search() {
            let body = {
                "title": this.title,
                "startDate": this.startTime,
                "endDate": this.endTime,
                "mainCategory": this.mainI,
                "subCategory": this.subI,
                "sort": this.sort
            }
            fetch("http://localhost:8080/search_news_A", {
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
                    if (data.message != null) {
                        if (!data.messageType) {
                            window.alert(data.message)
                        }
                    }

                    this.isSearch = true
                    this.contentCount = data.list.length

                    let body = {
                        "title": this.title,
                        "startDate": this.startTime,
                        "endDate": this.endTime,
                        "mainCategory": this.mainI,
                        "subCategory": this.subI,
                        "sort": this.sort,
                        "index": (this.currentPage - 1) * this.itemsPerPage,
                        "items": this.itemsPerPage
                    }
                    fetch("http://localhost:8080/search_news", {
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

                            // this.contentCount = data.list.length;
                        })
                        .catch(function (error) {
                            console.log(error)
                        })
                })
                .catch(function (error) {
                    console.log(error)
                })
        },
        mainMove() {
            this.subI = null
            this.findSub();
            this.changeMainT();
            this.goSearch();
        },
        add() {
            this.$router.push("/category/management");
        },
        category() {
            this.$router.push("/category");
        },
        go(target) {
            // console.log(target)
            this.$router.push(`/update/${target.newsId}`);

        },
        openSelect() {
            let body = {
                "list": this.deleteId,
            }
            fetch("http://localhost:8080/open", {
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
                    }
                    if (!data.messageType) {
                        window.alert(data.message);
                    }
                    this.find();
                })
                .catch(function (error) {
                    console.log(error)
                })

        },
        deleteSelect() {
            let body = {
                "list": this.deleteId,
            }
            fetch("http://localhost:8080/management", {
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
                    }
                    if (!data.messageType) {
                        window.alert(data.message);
                    }
                    this.find();
                })
                .catch(function (error) {
                    console.log(error)
                })

        },


        managementMainCategory() {
            this.$router.push('/maincategory/management')
        },
        managementSubCategory() {
            this.$router.push('/subcategory/management')
        },
        backToLsit() {
            this.$router.push('/')
        }

    },
    mounted() {
        this.getMain();
        this.getSub()
        this.find();
        // 設定高度
        this.vh = document.documentElement.scrollHeight - 72 - 85;
        document.getElementById("wrap").style.height = this.vh.toString() + "px";

    }
}
</script>
<template>
    <div id="wrap" class="d-flex flex-column mb-4 mt-2">
        <div class="d-flex justify-content-between">
            <div><input type="button" @click="backToLsit" class="btn btn-outline-info ms-5 my-2" value="前のページ">
            </div>
            <div></div>
        </div>
        <div class="d-flex mt-1 mx-5 border border-dark border-2 justify-content-center">

            <div class="row d-flex flex-column mt-3 me-2">
                <div class="col">
                    <div class="d-flex mb-2">
                        <h4>メインカテゴリ:</h4>
                        <select v-model="mainI" title="main" @change="mainMove" style="height: 25px;" class="ms-2"
                            name="main" id="">
                            <option value="" selected>--メインカテゴリ--</option>
                            <option v-for="data in mainC" :value="data.mainId">{{ data.mainCategoryName }}({{ data.news }})
                            </option>
                        </select>
                        <div class="mt-2">
                            <a @click="managementMainCategory" class=" mb-1 mt-n3 ms-3 btn btn-dark">メインカテゴリ管理</a>
                        </div>
                    </div>
                    <div class="d-flex">
                        <h4>サブカテゴリ:</h4>
                        <select @change="subMove(subI)" v-model="subI" style="height: 25px;" class="ms-2" name="sub"
                            id="sub" title="sub">
                            <option value="" selected id="sub">--サブカテゴリ--</option>
                            <option v-for="subData in subC" :value="subData.subId" id="sub">{{ subData.subCategoryName }}({{
                                subData.news
                            }})</option>
                        </select>
                        <div class="mt-2">
                            <a @click="managementSubCategory" class=" mb-1 mt-n3 ms-3 btn btn-dark">サブカテゴリ管理</a>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        <div class="d-flex justify-content-between mt-2 me-3">
            <div></div>
            <div class="me-3">
                <label for="items">ページごとのニュース数：</label>
                <select @change="goSearch" v-model="itemsPerPage" name="" id="items">
                    <option value="10" selected>10</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                </select>
            </div>
        </div>
        <div class="d-flex justify-content-between mt-2 me-3">
            <div></div>
            <div class="me-3">
                <button class="btn btn-dark" @click="deleteNews">ニュース削除</button>
            </div>
        </div>
        <div class="Result">
            <table class="table table-danger table-striped table-bordered border border-danger">
                <thead>
                    <tr>
                        <th></th>
                        <th>No.</th>
                        <th>メインカテゴリ</th> <!-- 空白列 -->
                        <th>サブカテゴリ</th>
                        <th>タイトル</th>
                        <th>発表日時</th>
                        <th>狀態</th>
                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    <!-- 使用子元件並傳遞相關資料 -->
                    <Result v-for="(property, index) in items" @getTarget="getId(property)" @goTarget="go"
                        v-bind:key="property" v-bind:property="property" v-bind:index="index" :page="currentPage" :sort="itemsPerPage"/>
                </tbody>

            </table>
        </div>
        <div class="outSide">
            <pagination v-if="!isSearch" :contentCount="contentCount" :page="currentPage" :itemsPerPage="itemsPerPage"
                @page-changed="handlePageChanged" class="mx-auto mb-n5" :key="'pagination-not-search-' + keyForPagination"></pagination>
            <pagination v-else :contentCount="contentCount" :page="currentPage" :itemsPerPage="itemsPerPage" @page-changed="handlePageChangedS"
                class="mx-auto mb-n5" :key="'pagination-search-' + keyForPagination"></pagination>
 
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
    top: 54%;
    width: 70%;
    height: 80px;
    justify-content: center;
    align-items: center;
    text-align: center;
    overflow-x: auto;


}

.Result {
    height: 37%;
    justify-content: space-around;
    text-align: center;
    overflow: auto;
    // margin-top: 10px;
    margin-bottom: -215px;
    padding-top: 3px;

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