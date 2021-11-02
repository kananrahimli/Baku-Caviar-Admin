import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Heritage from '../views/Heritage.vue'
import OurCaviar from '../views/OurCaviar.vue'
import Login from '../views/Login.vue'
import Contact from '../views/Contact.vue'
import "firebase/auth"
import firebase from 'firebase/app'
// import Register from '../views/Register.vue'

const routes = [
  {
    path: '/',
    redirect:'/login'
  },
  {
    path: '/login',
    name:'Login',
    component: Login,
    meta: {
      requiresAuth: false
  }
  },
  // {
  //   path: '/register',
  //   component: Register
  // },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    meta: {
      requiresAuth: true
    }
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
  },
  {
    path: '/heritage',
    name: 'Heritage',
    component: Heritage,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/our-caviar',
    name: 'OurCaviar',
    component: OurCaviar,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact,
    meta: {
      requiresAuth: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


router.beforeEach((to, from, next) => {
  firebase.auth().onAuthStateChanged(function(user) {
      if (to.matched.some(record => record.meta.requiresAuth)) {
          if (!user) {
              next({ path: '/login' });
          } else {
              next();
          }

      } else {
          next();
      }
  });
});


export default router
