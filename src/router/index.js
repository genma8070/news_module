import { createRouter, createWebHistory } from 'vue-router';
import HomeView from "../views/Home.vue";
import F_HomeView from "../views/User_Home.vue";
import UpdateView from "../views/UpdateView.vue";
import AddView from "../views/AddView.vue";
import TextView from "../views/TextView.vue";
import UserTextView from "../views/UserTextView.vue";
import PerviewView from "../views/PerviewView.vue";
import CategoryView from "../views/CategoryView.vue";
import MainCategoryUpdateView from "../views/MainCategoryUpdateView.vue";
import SubCategoryUpdateView from "../views/SubCategoryUpdateView.vue";
import MainCategoryAddView from "../views/MainCategoryAddView.vue";
import SubCategoryAddView from "../views/SubCategoryAddView.vue";
import MainCategoryManagementView from "../views/MainCategoryManagementView.vue";
import SubCategoryManagementView from "../views/SubCategoryManagementView.vue";



const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      // 管理者ホーム画面
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      // ニュース追加画面
      path: '/news/add',
      name: 'add',
      component: AddView,
    },
    {
      // ニュース詳細画面（雑）
      path: '/text/:Id',
      name: 'text',
      component: TextView,
    },
    {
      // ニュース詳細画面（雑）
      path: '/user/text/:Id',
      name: 'userText',
      component: UserTextView,
    },
    {
      // ニュース更新画面
      path: '/update/:Id',
      name: 'update',
      component: UpdateView,
    },
    {
      // ユーザーホーム画面
      path: '/user_home',
      name: 'user_home',
      component: F_HomeView,
     
    },
    {
      // ユーザーホーム画面
      path: '/category',
      name: 'category',
      component: CategoryView,
     
    },
    {
    
      // ユーザーホーム画面
      path: '/maincategory/update/:Id',
      name: 'MainCategoryUpdate',
      component: MainCategoryUpdateView,
     
    },
    {
    
      // ユーザーホーム画面
      path: '/subcategory/update/:Id',
      name: 'SubCategoryUpdate',
      component: SubCategoryUpdateView,
     
    }, 
    {
    
      // ユーザーホーム画面
      path: '/maincategory/add',
      name: 'MainCategoryAddView',
      component: MainCategoryAddView,
     
    }, 
    
    {
    
      // ユーザーホーム画面
      path: '/subcategory/add',
      name: 'SubCategoryAddView',
      component: SubCategoryAddView,
     
    }, 
    {
    
      // ユーザーホーム画面
      path: '/maincategory/management',
      name: 'MainCategoryManagementView',
      component: MainCategoryManagementView,
     
    }, 
    
    {
    
      // ユーザーホーム画面
      path: '/subcategory/management',
      name: 'SubCategoryManagementView',
      component: SubCategoryManagementView,
     
    }, 
    {
    
      // ユーザーホーム画面
      path: '/perview/:Id',
      name: 'Perview',
      component: PerviewView,
     
    },
  ]
})

export default router
