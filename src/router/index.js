import { createRouter, createWebHistory } from 'vue-router';
import LoginView from "../views/Login.vue";
import HomeView from "../views/Home.vue";
import F_HomeView from "../views/F_Home.vue";
import UpdataView from "../views/UpdataView.vue";
import AddView from "../views/AddView.vue";
import TextView from "../views/TextView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // {
    //   // 首頁
    //   path: '/',
    //   name: 'login',
    //   component: LoginView
    // },

    {
      // 管理者ホーム画面
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      // ニュース追加画面
      path: '/add/a',
      name: 'a',
      component: AddView,
    },
    {
      // ニュース詳細画面（雑）
      path: '/text/:Id',
      name: 'text',
      component: TextView,
    },
    {
      // ニュース更新画面
      path: '/updata/:Id',
      name: 'updata',
      component: UpdataView,
    },
    {
      // ユーザーホーム画面
      path: '/f_home',
      name: 'f_home',
      component: F_HomeView,
     
    },
  ]
})

export default router
