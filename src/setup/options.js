import VueRouter from 'vue-router';
import { i18n } from './i18n';
import store from '@/store/index';
import routes from './routes'; // MUST come after i18n because of build order.

const router = new VueRouter({
  routes,
  mode: 'history',
});

export default {
  el: '#app',
  store,
  i18n,
  router,
};
