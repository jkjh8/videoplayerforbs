const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/IndexPage.vue') }]
  },
  {
    path: '/video',
    component: () => import('layouts/VideoLayout.vue'),
    children: [{ path: '', component: () => import('pages/VideoPage.vue') }]
  },
  {
    path: '/playlist',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/PlaylistPage.vue') }]
  },
  {
    path: '/files',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/FilesPage.vue') }]
  },
  {
    path: '/setup',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/SetupPage.vue') }]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
