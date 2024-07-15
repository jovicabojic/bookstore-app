import { route } from 'quasar/wrappers'
import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'

export default route(function (/* { store, ssrContext } */) {
  // const createHistory = process.env.SERVER
  //   ? createMemoryHistory
  //   : (process.env.VUE_ROUTER_MODE === 'history' ? createWebHistory : createWebHashHistory)

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,
    history: createWebHistory(process.env.VUE_ROUTER_BASE)
  })
  return Router
})
