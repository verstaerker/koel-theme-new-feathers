/* eslint-disable import/first */
import Vue from 'vue';
import VModal from 'vue-js-modal';
import PortalVue from 'portal-vue';
import Tabs from 'vue-tabs-component';
import Vuetify from 'vuetify';
import VueAxios from './plugins/axios';
import VueBemCn from './plugins/vue-bem-cn';
import resizeEnd from './plugins/resize-end';
import eventBus from './plugins/event-bus';
import dayjs from './plugins/dayjs';
import viewport from './plugins/viewport';
import modal from './plugins/modalStack';

// Polyfills and self executing
import 'picturefill';
import 'lazysizes';
import './lib/ls.attrchange'; // Lazy sizes attribute change observer
import './polyfills';

Vue.use(resizeEnd);
Vue.use(VueAxios);
Vue.use(Vuetify);
Vue.use(eventBus);
Vue.use(dayjs);
Vue.use(viewport);
Vue.use(modal);
Vue.use(VueBemCn, {
  hyphenate: true,
});
Vue.use(PortalVue);
Vue.use(VModal);
Vue.use(Tabs);
