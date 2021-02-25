import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'  
// import About from '../views/About.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue'),
  },
  {
    path: '/categories',
    name: 'Categories',
    component: () => import('../views/Categories.vue')
  },
  {
    path: '/books',
    name: 'Books',
    component: () => import('../views/Books.vue')
  },
  {
    path: '/category/:slug',
    name: 'Category',
    component: () => import('../views/Category.vue')
  },
  {
    path: '/book/:slug',
    name: 'Book',
    component: () => import('../views/Book.vue')
  },


]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
