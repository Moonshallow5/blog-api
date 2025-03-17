
/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from 'vue-router/auto'
import { routes } from 'vue-router/auto-routes'
import Blog from '@/components/Blog.vue'
import Login from '@/components/Login.vue'
import PostView from '@/components/PostView.vue'
import Register from '@/components/Register.vue'
import Add_Post from '@/components/Add_Post.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes:[

    {
      path:'/posts',
      component: Blog,
      name:'blog'
    },
    {
      path:'/register',
      component: Register,
      name:'register'
    },

    {
      path:'/',
      component: Login,
      name:'login',
    },
    {
    path:'/add-post',
    component:Add_Post,
    name:'add_post',
    },
    {
    path:'/post/:id',
    component:PostView,
    name:'post-view',
    },



  ]
})

// Workaround for https://github.com/vitejs/vite/issues/11804
router.onError((err, to) => {
  if (err?.message?.includes?.('Failed to fetch dynamically imported module')) {
    if (!localStorage.getItem('vuetify:dynamic-reload')) {
      console.log('Reloading page to fix dynamic import error')
      localStorage.setItem('vuetify:dynamic-reload', 'true')
      location.assign(to.fullPath)
    } else {
      console.error('Dynamic import error, reloading page did not fix it', err)
    }
  } else {
    console.error(err)
  }
})

router.isReady().then(() => {
  localStorage.removeItem('vuetify:dynamic-reload')
})

export default router
