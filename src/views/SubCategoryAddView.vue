<script>
import Pagination from '../components/Pagination.vue';
import Result from '../components/Result.vue';
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
            mainName: "",
            subName: "",
            mainSub: true

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
            // console.log(this.deleteId)
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
        addSub() {
            let body = {
                "subCategoryName": this.subName,
                "mainId": this.mainI
            }
            fetch("http://localhost:8080/add_sub", {
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
                    this.getMain();
                })
                .catch(function (error) {
                    console.log(error)
                })

        },
        backToLsit() {
            this.$router.push('/subcategory/management')
        }
    },
    mounted() {
        this.getMain();
        // 設定高度
        this.vh = document.documentElement.scrollHeight - 72 - 85;
        document.getElementById("wrap").style.height = this.vh.toString() + "px";

    }
}
</script>
<template>
    <div id="wrap" class="d-flex flex-column mb-4 mt-2">
        <div class="d-flex justify-content-around">
            <input type="button" @click="backToLsit" class="btn btn-outline-info mx-n5" value="前のページ">
            <h1 class="mx-n5 ms-5">サブカテゴリ追加</h1>
            <p class="mx-2"></p>
        </div>


        <div class="d-flex flex-column mt-5 mx-5 border border-dark border-2 justify-content-center">
            <div class="d-flex justify-content-center">

                <div class="row d-flex flex-column mt-4 me-2">

                    <select @change="p" v-model="mainI" style="height: 25px; width: 300;" class="ms-2" name="main" id="">
                        <option value="" selected>--所属するメインカテゴリ--</option>
                        <option v-for="data in mainC" :value="data.mainId">{{ data.mainCategoryName }}({{ data.news }})
                        </option>
                    </select>
                    <div class="col d-flex my-3">
                        <label for="sub" class="h5">サブカテゴリ名称: </label>
                        <input v-model="subName" type="text" id="sub" class="ms-2" style="height: 25px;">

                    </div>
                </div>
                <div class="mt-5">
                    <a @click="addSub" class="mt-4 ms-3 btn btn-dark">追加</a>
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