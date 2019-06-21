import Vue from 'vue';
import Vuex from 'vuex';
import VuexORM from '@vuex-orm/core';
import camelCase from 'lodash/camelCase';
import Album from './models/Album';
import Artist from './models/Artist';
import Song from './models/Song';
import { get } from '@/setup/plugins/ajax'; // eslint-disable-line import/no-cycle
import { VUEX_ROOT_COMMIT_CONFIG } from '@/setup/globals';

const requireModel = require.context('./models', false, /.+\.js$/);
const requireModule = require.context('./modules/', true, /index\.js/);
const database = new VuexORM.Database();
const modules = requireModule.keys().reduce((accumulator, fileName) => {
  const moduleName = camelCase(fileName.replace(/(\.\/|\/index\.js)/g, ''));

  accumulator[moduleName] = requireModule(fileName).default;

  return accumulator;
}, {});

// Register VuexORM Models.
requireModel
  .keys()
  .forEach(key => database.register(requireModel(key).default));

Vue.config.devtools = process.env.NODE_ENV !== 'production' || process.env.HAS_WATCHER;

Vue.use(Vuex);

export default new Vuex.Store({
  /**
   * state, actions & getters
   * must be defined within modules
   * */
  modules,
  plugins: [VuexORM.install(database)],
  actions: {
    /**
     * Get the user related data from Koel.
     *
     * @param {Object} context - The Vuex module context.
     * @param {Function} context.commit - the commit method of the Vuex module.
     */
    getData({ commit }) {
      get('/api/data')
        .then((response) => {
          const {
            albums,
            songs,
            artists,
          } = response || {};

          if (albums) {
            Album.insert({ data: albums });
            commit('album/addAlbums', albums, VUEX_ROOT_COMMIT_CONFIG);
          }

          if (artists) {
            Artist.insert({ data: artists });
          }

          if (songs) {
            Song.insert({ data: songs });
          }
        });
    },

    /**
     * Clears all user related store data.
     *
     * @param {Object} context - The Vuex module context.
     * @param {Function} context.commit - the commit method of the Vuex module.
     */
    clearStore({ commit }) {
      commit('album/clearAlbums', null, VUEX_ROOT_COMMIT_CONFIG);
    }
  }
});
