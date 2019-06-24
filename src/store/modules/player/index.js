export default {
  namespaced: true,
  state: {
    /**
     * The current playlist.
     */
    playlist: [],
  },
  getters: {
    /**
     * Gets the current playlist.
     *
     * @param {Object} state - The Vuex module state.
     *
     * @returns {Array}
     */
    getPlaylist: state => state.playlist,

    /**
     * Gets the current (first) playlist song.
     *
     * @param {Object} state - The Vuex module state.
     *
     * @returns {*}
     */
    getCurrentSong: state => state.playlist[0],
  },
  mutations: {
    setPlaylist(state, songs) {
      if (!Array.isArray(songs)) {
        throw new Error('"songs" is not an Array.');
      }

      state.playlist = songs;
    },
    nextSong(state) {
      state.playlist = state.playlist.slice(1);
    }
  },
  // actions: {},
  // modules: [],
};
