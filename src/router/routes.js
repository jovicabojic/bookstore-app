const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        name: 'Dashboard',
        path: '/',
        meta: {
          title: 'Dashboard - BookStore'
        },
        component: () => import('pages/DashboardPage.vue')
      },
      {
        path: '/books',
        meta: {
          title: 'Books - BookStore'
        },
        children: [
          { path: '', component: () => import('pages/modules/books/BooksListPage.vue') },
          {
            path: '/books/view/:id',
            name: 'BookView',
            component: () => import('pages/modules/books/BookView.vue'),
            meta: {
              title: 'Edit Book - BooksStore'
            }
          }
        ]
      }
    ]
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
