export default {
  namespaced: true,
  state: {
    albums: [],
  },
  getters: {
    /**
     * Returns all albums currently in the store.
     *
     * @param {Object} state - The current Vuex module state.
     *
     * @returns {Array.<Object>}
     */
    getAlbums: state => state.albums,
  },
  mutations: {
    /**
     * Adds an Array of albums to the current list of albums.
     *
     * @param {Object} state - The current Vuex module state.
     * @param {Array.<Object>} payload - A list of album items.
     */
    addAlbums(state, payload) {
      state.albums.push(...payload);
    },

    /**
     * Clears all albums from the module state.
     *
     * @param {Object} state - The current Vuex module state.
     */
    clearAlbums(state) {
      state.albums = [];
    }
  },
  // actions: {},
  // modules: [],
};
