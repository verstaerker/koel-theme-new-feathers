import index from '../pages/index';
import album from '../pages/album/index';
import artist from '../pages/artist/index';
import artistAlbum from '../pages/artist/album';
import song from '../pages/song/index';
import albumDetail from '../pages/album/detail';
import settings from '../pages/settings/index';

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
  },
  artists: {
    path: 'artist',
    name: 'artist',
    component: artist,
    meta: {
      title: 'Artists',
      icon: 'i-microphone'
    },
  },
  songs: {
    path: 'song',
    name: 'song',
    component: song,
    meta: {
      title: 'Songs',
      icon: 'i-music-note'
    },
  },
  settings: {
    path: 'settings',
    name: 'settings',
    component: settings,
    meta: {
      title: 'Einstellungen',
      icon: 'i-gears',
    }
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
            props: true,
            meta: {
              title: 'Album',
            }
          },
        ]
      },
      {
        ...navigation.artists,
        children: [
          {
            path: ':artistId',
            name: 'artistDetail',
            component: artistAlbum,
            props: true,
            meta: {
              title: 'Artist Detail',
            }
          },
        ]
      },
      navigation.songs,
      navigation.settings,
    ]
  },
  {
    path: '*',
    redirect: root,
  },
];
