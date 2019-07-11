/* eslint-disable import/first */
import Vue from 'vue';
import VModal from 'vue-js-modal';
import PortalVue from 'portal-vue';
import Tabs from 'vue-tabs-component';
import VueBemCn from '../plugins/vue-bem-cn';
import resizeEnd from '../plugins/resize-end';
import eventBus from '../plugins/event-bus';
import dayjs from '../plugins/dayjs';
import viewport from '../plugins/viewport';
import modal from '../plugins/modalStack';
import ajax from '../plugins/ajax/index';

// Self executing
import './vuetify'; // Only import if required by project!

Vue.use(resizeEnd);
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
Vue.use(ajax);
