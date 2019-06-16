import Vue from 'vue';
import Vuex from 'vuex';
import camelCase from 'lodash/camelCase';
import { get } from '@/setup/plugins/ajax'; // eslint-disable-line import/no-cycle
import { VUEX_ROOT_COMMIT_CONFIG } from '@/setup/globals';

const requireModule = require.context('./modules/', true, /index\.js/);
const modules = requireModule.keys().reduce((accumulator, fileName) => {
  const moduleName = camelCase(fileName.replace(/(\.\/|\/index\.js)/g, ''));

  accumulator[moduleName] = requireModule(fileName).default;

  return accumulator;
}, {});

Vue.config.devtools = process.env.NODE_ENV !== 'production' || process.env.HAS_WATCHER;

Vue.use(Vuex);

export default new Vuex.Store({
  /**
   * state, actions & getters
   * must be defined within modules
   * */
  modules,
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
          const { albums } = response || {};

          if (albums) {
            commit('album/addAlbums', albums, VUEX_ROOT_COMMIT_CONFIG);
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
