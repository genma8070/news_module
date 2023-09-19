<script>
import subResult from '../components/SubCategoryResult.vue';
import Result from '../components/CategoryResult.vue';
export default {
    components: {
        Result,
        subResult
    },

    data() {
        return {
            vh: 0,
            contentCount: 10,
            itemsPerPage: 10,
            currentPage: 1,
            items: [
            ],
            subItems: [
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
            deleteSubId: [],
            mainValue: "",
            subValue: "",
            mainSub: true


        }
    },
    methods: {
        getId(value) {
            // console.log(value)
            const index = this.deleteId.findIndex(i => i === value.mainId);
            if (index !== -1) {
                this.deleteId.splice(index, 1); // 从数组中删除找到的元素
            } else {
                this.deleteId.push(value.mainId)
            }
            console.log(this.deleteId)
        },
        getSubId(value) {
            // console.log(value)
            const index = this.deleteSubId.findIndex(i => i === value.subId);
            if (index !== -1) {
                this.deleteSubId.splice(index, 1); // 从数组中删除找到的元素
            } else {
                this.deleteSubId.push(value.subId)
            }
            console.log(this.deleteSubId)
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
                    this.items = data.list2;

                    // console.log(data)
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
                    this.subItems = data.list;
                    // console.log(data)

                })
                .catch(function (error) {
                    console.log(error)
                })
        },
        backToLsit() {
            this.$router.push('/category')
        },

        deleteSub() {
            let body = {
                "deleteList": this.deleteSubId
            }
            fetch("http://localhost:8080/delete_sub", {
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
                        this.deleteSubId = [];
                    }
                    if (!data.messageType) {
                        window.alert(data.message);
                    } this.getSub();
                })
                .catch(function (error) {
                    console.log(error)
                })
        },
        changMain() {
            this.mainSub = true
        },
        changSub() {
            this.mainSub = false
        },
        mainMove() {
            this.subI = ""
            this.findSub();
            this.changeMainT();

        }, subMove(subI) {
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

        }, addSubCategory() {
            this.$router.push('/subcategory/add')
        },

    },
    mounted() {
        this.getMain();
        this.getSub();

        this.vh = document.documentElement.scrollHeight - 72 - 85;
        document.getElementById("wrap").style.height = this.vh.toString() + "px";

    }
}
</script>
<template>
    <div id="wrap" class="d-flex flex-column mb-4 mt-2 over-flow">

        <div class="d-flex flex-column justify-content-between">
            <div class="d-flex justify-content-around">
                <input type="button" @click="backToLsit" class="btn btn-outline-info mx-n5" value="回上一頁">
                <h1 class="mx-n5 ms-5">管理子分類</h1>
                <p class="mx-2"></p>
            </div>

            <div>
                <div class="d-flex justify-content-around align-items-center">
                    <p class="mx-5 me-5 "></p>
                    <div class="mt-1 me-n5 ms-5">
                        <select @change="mainMove" v-model="mainI" style="height: 25px; width: 300;" class="h5" name="main"
                            id="">
                            <option value="" selected>--請選擇父分類--</option>
                            <option v-for="data in mainC" :value="data.mainId">{{ data.mainCategoryName }}({{ data.news
                            }})
                            </option>
                        </select>
                    </div>
                    <div class="d-flex flex-column">
                        <a @click="addSubCategory" class="mb-1 btn btn-dark">新增子分類</a>
                        <input type="button" @click="deleteSub" class="btn btn-dark" value="刪除子分類">
                    </div>
                </div>
                <div class="Result">

                    <table class="table table-danger table-striped table-bordered border border-danger">
                        <thead>
                            <tr>
                                <th>可否刪除</th>
                                <th>No.</th>
                                <th>副分類</th>
                                <th></th>
                            </tr>
                        </thead>

                        <tbody>
                            <!-- 使用子元件並傳遞相關資料 -->
                            <subResult @getSubTarget="getSubId(property2)" v-for="(property2, index) in subC"
                                v-bind:key="property2" v-bind:property2="property2" v-bind:index="index" />
                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
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
    margin-top: 5px;
    height: 50vh;
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