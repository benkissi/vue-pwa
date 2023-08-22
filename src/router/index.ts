import { createRouter, createWebHistory } from 'vue-router'
import type { RouteLocationNormalizedLoaded } from 'vue-router'
import SplashPage from '../views/SplashPage.vue'

declare module 'vue-router' {
  interface RouteMeta {
    // is optional
    parent?: (route: RouteLocationNormalizedLoaded) => {
      name: string
      path: string
    }
    displayRoute: string
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'splash',
      component: SplashPage
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue')
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      redirect: '/shipments',
      component: () => import('../views/dashboard/Index.vue'),
      children: [
        {
          path: '/shipments',
          name: 'shipments',
          component: () => import('../views/dashboard/shipments/Index.vue'),
          meta: {
            displayRoute: 'shipments'
          },
          children: [
            {
              path: '/shipments',
              name: 'shipments',
              component: () =>
                import('../views/dashboard/shipments/Shipments.vue'),
              meta: {
                displayRoute: 'shipments'
              }
            },
            {
              path: '/shipments/details/:id',
              name: 'details',
              redirect: { name: 'shipmentDetails' },
              component: () =>
                import('../views/dashboard/shipments/details/Index.vue'),

              children: [
                {
                  path: '/shipments/details/:id',
                  name: 'shipmentDetails',
                  component: () =>
                    import('../views/dashboard/shipments/details/Details.vue'),
                  meta: {
                    displayRoute: 'shipmentDetails',
                    parent: (route) => {
                      console.log('route--', route.params.id)
                      return {
                        name: 'shipments',
                        path: '/shipments'
                      }
                    }
                  }
                },
                {
                  path: '/shipments/details/:id/upload-bill',
                  name: 'uploadBill',
                  component: () =>
                    import(
                      '../views/dashboard/shipments/details/UploadBill.vue'
                    ),
                  meta: {
                    displayRoute: 'uploadBill',
                    parent: (route) => {
                      return {
                        name: 'shipmentDetails',
                        path: `/shipments/details/${route.params.id}`
                      }
                    }
                  }
                },
                {
                  path: '/shipments/details/:id/edit-bill/:billId',
                  name: 'editBill',
                  component: () =>
                    import(
                      '../views/dashboard/shipments/details/UploadBill.vue'
                    ),
                  meta: {
                    displayRoute: 'editBill',
                    parent: (route) => {
                      return {
                        name: 'shipmentDetails',
                        path: `/shipments/details/${route.params.id}`
                      }
                    }
                  }
                },
                {
                  path: '/shipments/details/:id/confirm-cargo',
                  name: 'confirmCargo',
                  component: () =>
                    import(
                      '../views/dashboard/shipments/details/ConfirmCargo.vue'
                    ),
                  meta: {
                    displayRoute: 'confirmCargo',
                    parent: (route) => {
                      return {
                        name: 'shipmentDetails',
                        path: `/shipments/details/${route.params.id}`
                      }
                    }
                  }
                },
                {
                  path: '/shipments/details/:id/cargo-details',
                  name: 'cargoDetails',
                  component: () =>
                    import(
                      '../views/dashboard/shipments/details/CargoDetails.vue'
                    ),
                  meta: {
                    displayRoute: 'cargoDetails',
                    parent: (route) => {
                      return {
                        name: 'shipmentDetails',
                        path: `/shipments/details/${route.params.id}`
                      }
                    }
                  }
                }
              ]
            }
          ]
        }
      ]
    }
  ]
})

export default router
