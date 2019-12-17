import Vue from "vue";
import VueRouter from "vue-router";
import About from "../views/About.vue";
import Home from "../views/Home.vue";
import Dashboard from "../views/Dashboard.vue";
import Todo from "../views/Todo.vue";
import Profile from "../views/Profile.vue";
import { fb } from "../firebaseConfig";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/about",
      name: "about",
      component: About
    },
    {
      path: "/dashboard",
      name: "dashboard",
      component: Dashboard,
      meta: { requiresAuth: true },
      children: [
        {
          path: "todo",
          name: "todo",
          component: Todo
        },
        {
          path: "profile",
          name: "profile",
          component: Profile
        }
      ]
    }
  ]
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth);
  const currentUser = fb.auth().currentUser;

  if(requiresAuth && !currentUser){
    next("/")
  }
  else if(requiresAuth && currentUser){
    next()
  }
  else{
    next()
  }
});

// const router = new VueRouter({
  // mode: "history",
  // base: process.env.BASE_URL,
//   routes
// });

export default router;
