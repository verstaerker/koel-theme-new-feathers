import index from '../pages/index';

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
    path: '*',
    redirect: root,
  },
];
