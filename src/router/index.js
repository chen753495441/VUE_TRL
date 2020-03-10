import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home'
import Category from '../components/category/Category'
import User from '../components/user/User'
import Login from '../components/login/Login'
import Register from '../components/login/Register'
import Set from '../components/user/Set'
import ForgetPassword from '../components/fogetPassword/FogetPassword'
import GetQuestion from '../components/fogetPassword/GetQuestion'
import PushAnswer from '../components/fogetPassword/PushAnswer'
import ChangePassword from '../components/fogetPassword/ChangePassword'
import Cart from '../components/cart/Cart'
import Goods from '../components/goods/Goods'
import Pay from '../components/pay/Pay'
import Settlement from '../components/pay/Settlement'
import SetAddress from '../components/address/Setaddress'
import PayPicture from '../components/pay/PayPicture'

Vue.use(VueRouter)

const router = new VueRouter({
  routes:[
      {path:'/',component:Home},
      {path:'/category',component:Category},
      {path:'/user',component:User},
      {path:'/login',component:Login},
      {path:'/register',component:Register},
      {path:'/userset',component:Set},
      {
          path: '/forgetpassword',
          component:ForgetPassword,
          redirect:'/getquestion',
          children:[
              {path:'/getquestion',component:GetQuestion},
              {path:'/pushanswer',component:PushAnswer},
              {path:'/changepassword',component:ChangePassword},

          ]
      },
      {path:'/cart',component:Cart},
      {path:'/goods',component:Goods},
      {
          path:'/pay',
          component:Pay,
          redirect:'/settlement',
          children: [
              {path:'/settlement',component:Settlement},
              {path:'/paypicture',component:PayPicture}
]
      },
      {path:'/setaddress',component:SetAddress}
  ]
})

export default router
