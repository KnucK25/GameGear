import { createRouter, createWebHistory } from "vue-router";
import Login from "./components/UserLogin.vue";
import Registration from "./components/UserRegistration.vue";
import UsersList from "./components/admin/UsersList.vue";
import GoodsList from "./components/admin/GoodsList.vue";
import AdminPanel from "./components/admin/AdminPanel.vue";
import useUsers from "./composables/useUsers";
import Home from "./components/HomeBase.vue";
import Store from "./components/StoreList.vue";
import ProductPage from "./components/ProductPage.vue";
import Profile from "./components/UserProfile.vue";
import Cart from "./components/UserCart.vue";
import Support from "./components/SupportPage.vue"
import Contacts from "./components/ContactsPage.vue"
import ProductDescription from "./components/product/ProductDescription.vue";
import ProductSpecs from "./components/product/ProductSpecs.vue";
import NotFound from "./components/error/NotFound.vue";
import Forbidden from "./components/error/ForbiddenPage.vue";

//Вот тут прописываем все варианты маршрутов, и соответственно если мы не авторизованы, то таблица нам недоступна
const routes = [
  //Подмечу, что при заходе на страницу нас всегда направляет на главную
  { path: "/", redirect: "/home" },
  { path: "/home", component: Home, name: "Home" },
  { path: "/login", component: Login, name: "Login" },
  { path: "/register", component: Registration, name: "Registration" },
  { path: "/store", component: Store, name: "Store" },
  { path: "/support", name: "Support", component: Support },
  { path: "/contacts", name: "Contacts", component: Contacts },
  {
    path: "/product/:id",
    name: "ProductPage",
    component: ProductPage,
    children: [
      {
        path: "desc",
        name: "ProductDescription",
        component: ProductDescription
      },
      {
        path: "specs",
        name: "ProductSpecs",
        component: ProductSpecs
      }
    ]
  },
  {
    path: "/admin-panel",
    component: AdminPanel,
    name: "AdminPanel",
    beforeEnter: (to, from, next) => {
      if (!useUsers().currentUser.value?.admin) next({name : "Forbidden"});
      else next();
    },
    children: [
      {
        path: "users",
        name: "AdminUsers",
        component: UsersList
      },
      {
        path: "goods",
        name: "AdminGoods",
        component: GoodsList
      },
    ],
  },
  {
    path: "/forbidden",
    name: "Forbidden",
    component: Forbidden
  },
  {
    path: "/cart",
    name: "Cart",
    component: Cart,
    beforeEnter: (to, from, next) => {
      if (!useUsers().currentUser.value) next({name : "Forbidden"});
      else next();
    }
  },
  {
    path: "/profile",
    name: "Profile",
    component: Profile,
    beforeEnter: (to, from, next) => {
      if (!useUsers().currentUser.value) next({name : "Forbidden"});
      else next();
    }
  },
  {
    path: "/404",
    name: "NotFound",
    component: NotFound
  }
];

//Вот это нужно для экспорта в другие файлики
export const router = createRouter({
  history: createWebHistory("/GameGear/"),
  routes
});


router.beforeEach((to, from, next) => {

  if (to.matched.length === 0) {
    next({ name: "NotFound" })
  } else {
    next()
  }

})
