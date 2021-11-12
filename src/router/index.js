import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Heritage from '../views/Heritage.vue'
import OurCaviar from '../views/OurCaviar.vue'
import Login from '../views/Login.vue'
import Contact from '../views/Contact.vue'

// ENG
import HomeEn from '../views/en/HomeEn.vue'
import AboutEn from '../views/en/AboutEn.vue'
import HeritageEn from '../views/en/HeritageEn.vue'
import OurCaviarEn from '../views/en/OurCaviarEn.vue'
import ContactEn from '../views/en/ContactEn.vue'

// RUS
import HomeRu from '../views/rus/HomeRu.vue'
import AboutRu from '../views/rus/AboutRu.vue'
import HeritageRu from '../views/rus/HeritageRu.vue'
import OurCaviarRu from '../views/rus/OurCaviarRu.vue'
import ContactRu from '../views/rus/ContactRu.vue'

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
  },

  // ENG

  {
    path: '/en/home',
    name: 'HomeEn',
    component: HomeEn,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/en/about',
    name: 'AboutEn',
    component: AboutEn,
    meta: {
      requiresAuth: true
    }
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
  },
  {
    path: '/en/heritage',
    name: 'HeritageEn',
    component: HeritageEn,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/en/our-caviar',
    name: 'OurCaviarEn',
    component: OurCaviarEn,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/en/contact',
    name: 'ContactEn',
    component: ContactEn,
    meta: {
      requiresAuth: true
    }
  },


  // RU
  {
    path: '/rus/home',
    name: 'HomeRu',
    component: HomeRu,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/rus/about',
    name: 'AboutRu',
    component: AboutRu,
    meta: {
      requiresAuth: true
    }
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
  },
  {
    path: '/rus/heritage',
    name: 'HeritageRu',
    component: HeritageRu,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/rus/our-caviar',
    name: 'OurCaviarRu',
    component: OurCaviarRu,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: '/rus/contact',
    name: 'ContactRu',
    component: ContactRu,
    meta: {
      requiresAuth: true
    }
  },
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
