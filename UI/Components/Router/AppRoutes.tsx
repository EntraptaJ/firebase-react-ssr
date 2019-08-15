// UI/UI/Components/Router/AppRoutes.tsx
import { AppRoute } from 'UI/Components/Router/types';
import { Loadable } from './Loadable';

export const AppRoutes: AppRoute[] = [
  {
    label: 'Home',
    path: '/',
    to: '/',
    exact: true,
    Loadable: Loadable(import('UI/Routes/Home/index'), 'Routes/Home/index.tsx')
  },
  {
    label: 'Posts',
    path: 'Posts',
    to: '/Posts/',
    Loadable: Loadable(import('UI/Routes/Posts/List'), 'Routes/Posts/List.tsx'),
    children: [
      {
        label: 'New Post',
        path: 'New',
        to: '/Posts/New',
        exact: true,
        Loadable: Loadable(import('UI/Routes/Posts/CreatePost'), 'Routes/Posts/CreatePost.tsx')
      }
    ]
  }
]