import index from '../pages/index';
import albums from '../pages/albums';

const root = '/';

/**
 * This file is only meant for style-example routes
 */
export default [
  {
    path: root,
    name: 'index',
    component: index,
    meta: {
      title: 'Index',
    }
  },
  {
    path: `${root}/albums`,
    name: 'albums',
    component: albums,
    meta: {
      title: 'Albums',
    }
  },
  {
    path: '*',
    redirect: root,
  },
];
