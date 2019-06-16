import { i18n } from '@/setup/i18n';

export default {
  namespaced: true,
  state: {
    /**
     * @type {String} Stores the session token.
     */
    token: null,
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
    login({ commit }, payload) {
      return fetch(`//localhost:8888${i18n.t('api.root')}${i18n.t('api.login')}`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })
        .then(response => response.json())
        .then((response) => {
        const token = response && response.token;

        if (token) {
          commit('setToken', token);

          localStorage.setItem('koelToken', token);

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
     */
    logout({ commit }) {
      localStorage.removeItem('koelToken');

      commit('setToken', null);
    }
  },
};
