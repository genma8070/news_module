<script>

export default {
    components: {
    
    },

    data() {
        return {
            vh: 0,
            account: "",
            password: ""
        }
    },
    methods: {
        submit() {
            this.$router.push("/signUp")
        },
        login() {
            let body = {
                "account": this.account,
                "password": this.password
            }
            fetch("http://localhost:8080/login", {
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
                    window.alert(data.message)
                    sessionStorage.setItem("position", data.position)
                    if (data.position === 1 || data.position === 0) {
                        this.$router.push('/home')
                    } else {
                        this.$router.push('/f_home')
                    }

                })
                .catch(function (error) {
                    console.log(error)
                })

        },
        admin() {
            let body = {
                "account": this.account,
                "password": this.password
            }
            fetch("http://localhost:8080/login", {
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
                    if (data.position != null) {
                        if (data.position === 0) {
                            window.alert("管理員認證成功")
                            sessionStorage.setItem("position", data.position)
                            this.$router.push('/admin')
                        } else {
                            window.alert("權限不足")
                        }
                    }else{
                        window.alert("請輸入帳號密碼")
                    }
                })
                .catch(function (error) {
                    console.log(error)
                })

        }



    },
    mounted() {
        if (sessionStorage.getItem("position") != null) {
            sessionStorage.clear();
            this.$router.push('/')
        }

        // 設定高度
        this.vh = document.documentElement.scrollHeight - 72 - 85;
        document.getElementById("wrap").style.height = this.vh.toString() + "px";

    }
}
</script>
<template>
    <div id="wrap" class="d-flex flex-column mb-4 justify-content-center text-center">
        <div class="mb-5">
            <h1>登入</h1>
        </div>

        <div class="d-flex mt-1 mx-5 border border-dark border-2 justify-content-center">

            <div class="row d-flex flex-column mx-3 my-2">

                <div class="col d-flex">
                    <h4>帳號:</h4>
                    <input v-model="account" style="height: 25px; width: 338px;" class="ms-2" type="text">
                </div>
                <div class="col d-flex">
                    <h4>密碼:</h4>
                    <input v-model="password" style="height: 25px; width: 338px;" class="ms-2" type="text">

                </div>
            </div>

        </div>
        <div class="d-flex justify-content-between">
            <div class="mt-2">
                <button @click="login" class="ms-5" type="button">登入</button>
                <button @click="submit" class="ms-5" type="button">註冊</button>
            </div>
            <div class="mt-2 me-5">
                <button @click="admin" class="ms-5" type="button">權限管理</button>
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

    /* 自定義高度，根據需要調整 */
}
</style>