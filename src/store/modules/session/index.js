import { TOKEN_KEY, VUEX_ROOT_COMMIT_CONFIG } from '@/setup/globals';
import { i18n } from '@/setup/i18n';
import { post } from '@/plugins/ajax';

export default {
  namespaced: true,
  state: {
    /**
     * @type {String} Stores the session token.
     */
    token: null,

    /**
     * @type {Object} Stores the koel settings.
     */
    settings: null,
  },
  getters: {
    /**
     * Get current session token.
     *
     * @param {Object} state - The current module store state.
     *
     * @returns {String|null}
     */
    getToken: state => state.token,

    /**
     * Returns the current koel konfiguration.
     *
     * @param {Object} state - The current module store state.
     *
     * @returns {Object}
     */
    getSettings: state => state.settings || {},
  },
  mutations: {
    /**
     * Sets the session token for the user.
     *
     * @param {Object} state - Current state object.
     * @param {String} token - Theme id which should be set.
     */
    setToken(state, token) {
      state.token = token;
    },

    /**
     * Sets new koel settings.
     *
     * @param {Object} state - Current state object.
     * @param {Object} settings - The new koel settings.
     * @param {String} settings.mediaPath - The absolute path to the music files.
     */
    setSettings(state, settings) {
      state.settings = settings;
    },

    /**
     * Sets the new media path value for the koel settings.
     *
     * @param {Object} state - Current state object.
     * @param {String} mediaPath - The new media path value.
     */
    setMediaPath(state, mediaPath) {
      if (!state.settings) {
        state.settings = {};
      }

      state.settings.mediaPath = mediaPath;
    }
  },
  actions: {
    /**
     * Sends a login request to the server with the given credentials.
     *
     * @param {Object} context - The Vuex context.
     * @param {Function} context.commit - The commit method for the current Vuex module.
     * @param {Object} payload - The user credentials.
     * @param {String} payload.email - The users email address.
     * @param {String} payload.password - The users password.
     * @returns {Promise<any | never>}
     */
    login({ commit, dispatch }, payload) {
      return post(i18n.t('api.root') + i18n.t('api.login'), payload)
        .then((response) => {
        const token = response && response.token;

        if (token) {
          commit('setToken', token);

          localStorage.setItem(TOKEN_KEY, token);

          dispatch('getData', null, VUEX_ROOT_COMMIT_CONFIG);

          return response;
        }

        return Promise.reject(new Error('Login failed'));
      });
    },

    /**
     * Logout from current session.
     *
     * @param {Object} context - The Vuex context.
     * @param {Function} context.commit - The commit method for the current Vuex module.
     * @param {Function} context.dispatch - The dispatch method for the current Vuex module.
     */
    logout({ commit, dispatch }) {
      localStorage.removeItem(TOKEN_KEY);

      commit('setToken', null);
      dispatch('clearStore', null, VUEX_ROOT_COMMIT_CONFIG);
    },

    /**
     * Maps and sets the koel settings from the server.
     *
     * @param {Object} context - The Vuex module context.
     * @param {Function} context.commit - The commit method for the current Vuex module
     * @param {Object} settings - The koel settings response.
     * @param {String} settings.media_path - The media path from the koel settings.
     */
    settings({ commit }, { media_path: mediaPath }) {
      commit('setSettings', {
        mediaPath
      });
    }
  },
};
