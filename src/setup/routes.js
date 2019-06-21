import index from '../pages/index';
import album from '../pages/album/index';
import albumDetail from '../pages/album/detail';

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
    path: `${root}album`,
    name: 'album',
    component: album,
    meta: {
      title: 'Albums',
    }
  },
  {
    path: `${root}album/:id`,
    name: 'albumDetail',
    component: albumDetail,
    meta: {
      title: 'Album',
    }
  },
  {
    path: '*',
    redirect: root,
  },
];
