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
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/add/a',
      name: 'a',
      component: AddView,
    },
    {
      path: '/text/:Id',
      name: 'text',
      component: TextView,
    },
   
    {
      path: '/updata/:Id',
      name: 'updata',
      component: UpdataView,
    },
    {
      path: '/f_home',
      name: 'f_home',
      component: F_HomeView,
     
    },
  ]
})

export default router
