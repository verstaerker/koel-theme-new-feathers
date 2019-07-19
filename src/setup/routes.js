import index from '../pages/index';
import album from '../pages/album/index';
import albumDetail from '../pages/album/detail';

const root = '/';

export const navigation = {
  home: {
    path: root,
    name: 'index',
    component: index,
    meta: {
      title: 'Index',
      icon: 'i-house',
    },
  },
  albums: {
    path: 'album',
    name: 'album',
    component: album,
    meta: {
      title: 'Albums',
      icon: 'i-album'
    },
  }
};

/**
 * This file is only meant for style-example routes
 */
export default [
  {
    ...navigation.home,
    children: [
      {
        ...navigation.albums,
        children: [
          {
            path: ':albumId',
            name: 'albumDetail',
            component: albumDetail,
            meta: {
              title: 'Album',
            }
          },
        ]
      },
    ]
  },
  {
    path: '*',
    redirect: root,
  },
];
