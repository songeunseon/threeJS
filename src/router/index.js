import { createRouter, createWebHistory } from 'vue-router'
import Main from '../views/Main.vue'
import Viewer from '../views/Viewer.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'Home', component: Main },
    { path: '/viewer', name: 'Viewer', component: Viewer },
  ],
})

export default router
