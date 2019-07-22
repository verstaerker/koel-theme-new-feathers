export default {
  namespaced: true,
  state: {
    /**
     * The current playlist.
     */
    playlist: [],

    currentIndex: 0,

    previous: null,

    current: null,

    next: null,

    isPlaying: false,
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
    getCurrentSong: state => state.playlist[state.currentIndex],

    getPreviousSong: state => state.playlist[state.currentIndex - 1],

    getNextSong: state => state.playlist[state.currentIndex + 1],

    getIsPlaying: state => state.isPlaying,

    hasMoreSongs: state => !!state.playlist[state.currentIndex + 1],
  },
  mutations: {
    setPlaylist(state, songs) {
      if (!Array.isArray(songs)) {
        throw new Error('"songs" is not an Array.');
      }

      state.playlist = songs;
    },
    setCurrentIndex(state, index) {
      state.currentIndex = index;
    },
    nextSong(state) { // TODO: the list should not be modified
      state.currentIndex += 1;
    },
    setIsPlaying(state, isPlaying) {
      state.isPlaying = isPlaying === true;
    }
  },
  actions: {
    replacePlaylist({ commit }, { playlist, playIndex, autoPlay }) {
      commit('setIsPlaying', autoPlay);

      commit('setPlaylist', playlist);

      commit('setCurrentIndex', playIndex || 0);
    }
  },
  // modules: [],
};
