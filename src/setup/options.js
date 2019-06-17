import VueRouter from 'vue-router';
import { i18n } from './i18n';
import { TOKEN_KEY, VUEX_ROOT_COMMIT_CONFIG } from './globals';
import store from '@/store/index';
import routes from './routes'; // MUST come after i18n because of build order.
import cApp from '@/components/c-app';

const router = new VueRouter({
  routes,
  mode: 'history',
});

export default {
  el: '#app',
  template: '<c-app />',
  components: {
    cApp,
  },
  store,
  i18n,
  router,
  created() {
    const token = localStorage.getItem(TOKEN_KEY);

    // Restore session if token exists.
    if (token) {
      this.$store.commit('session/setToken', token); // TODO: Test if token is still valid.

      this.$store.dispatch('getData', null, VUEX_ROOT_COMMIT_CONFIG);
    }
  }
};
