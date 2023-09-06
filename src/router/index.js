import { createRouter, createWebHistory } from 'vue-router';
import LoginView from "../views/Login.vue";
import HomeView from "../views/Home.vue";
import F_HomeView from "../views/F_Home.vue";
import UpdataView from "../views/UpdataView.vue";
import AddView from "../views/AddView.vue";
import TextView from "../views/TextView.vue";
import CategoryView from "../views/CategoryView.vue";
import CategoryUpdateView from "../views/CategoryUpdateView.vue";
import SubCategoryUpdateView from "../views/SubCategoryUpdateView.vue";
import CategoryManagementView from "../views/CategoryManagementView.vue";


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
    {
      // ユーザーホーム画面
      path: '/category',
      name: 'category',
      component: CategoryView,
     
    },{
    
      // ユーザーホーム画面
      path: '/category/management',
      name: 'categoryManagement',
      component: CategoryManagementView,
     
    },{
    
      // ユーザーホーム画面
      path: '/category/update/:Id',
      name: 'CategoryUpdate',
      component: CategoryUpdateView,
     
    },{
    
      // ユーザーホーム画面
      path: '/subcategory/update/:Id',
      name: 'SubCategoryUpdate',
      component: SubCategoryUpdateView,
     
    },
  ]
})

export default router
