import Vue from 'vue'
import Router from 'vue-router'
import VueAxios from "vue-axios";
import axios from "axios";

import WebBordPage from './components/WebBord.vue'
import LoginPage from './components/Login.vue'
import RegisterPage from './components/Register.vue'
import testshowPage from './components/testshow.vue'
import HomePage from './components/Home.vue'
import ResetPass from './components/ResetPass.vue'
import CreateTopic from './components/CreateTopic.vue'
import Upload from './components/upload.vue'
import EditAccount from './components/EditAccount.vue'
import DetailTopic from './components/DetailTopic.vue'

Vue.use(Router);
Vue.use(VueAxios, axios);

export default new Router({
    mode: 'history',
    routes: [
        {
          name: "WebBord",
          path: "/web_bord",
          component: WebBordPage
        },{
          name: "Login",
          path: "/",
          component: LoginPage
        },{
          name: "Register",
          path: "/register",
          component: RegisterPage
        },{
          name: "testshow",
          path: "/test_show",
          component: testshowPage
        },{
          name: "Home",
          path: "/Home",
          component: HomePage
        },{
          name: "ResetPass",
          path: "/Reset_Pass",
          component: ResetPass
        },{
          name: "CreateTopic",
          path: "/Create_Topic",
          component: CreateTopic
        },{
          name: "Upload",
          path: "/up_load",
          component: Upload
        },{
          name: "EditAccount",
          path: "/Edit_Account",
          component: EditAccount
        },{
          name: "DetailTopic",
          path: "/Detail_Topic",
          component: DetailTopic
        }
      ],
})
