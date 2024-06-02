import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/about",
      name: "about",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/signin",
      name: "signin",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/SignInView.vue"),
    },
    {
      path: "/signup",
      name: "signup",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/SignUpView.vue"),
    },
    {
      path: "/forum",
      name: "forum",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/ForumView.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/result/:flightData",
      name: "result",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/ResultView.vue"),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/checkout/:id",
      name: "checkout",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/CheckoutView.vue"),
    },
    {
      path: "/admin",
      name: "admin",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/AdminView.vue"),
      meta: {
        requiresAuth: true,
        requiresAdmin: true,
      },
    },
    {
      path: "/booking",
      name: "boking",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/BookingView.vue"),
      meta: {
        requiresAuth: true,
        requiresAdmin: true,
      },
    },
    {
      path: "/booking-list",
      name: "booking-list",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/OrderView.vue"),
      meta: {
        requiresAuth: true,
        requiresAdmin: true,
      },
    },
    {
      path: "/create-flight",
      name: "create-flight",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/CreateFlightView.vue"),
    },
    {
      path: "/edit-flight/:id",
      name: "edit-flight",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/EditFlightView.vue"),
    },
    {
      path: "/nonauth",
      name: "noauth",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import("../views/NonAuthorizeView.vue"),
    },
  ],
});

router.beforeEach((to, from, next) => {
  const user = localStorage.getItem("user");
  const role = localStorage.getItem("role");
  if (user) {
    if (to.meta.requiresAuth) {
      if (role === "admin") {
        next();
      } else if (role === "user" && !to.meta.requiresAdmin) {
        next();
      } else {
        next("/nonauth");
      }
    } else {
      next();
    }
  } else {
    if (to.meta.requiresAuth) {
      next("/signin");
    } else {
      next();
    }
  }
});

export default router;
