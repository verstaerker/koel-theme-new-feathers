import post from './methods/post'; // eslint-disable-line import/no-cycle
import get from './methods/get'; // eslint-disable-line import/no-cycle

export {
  post,
  get
};

/**
 * Adds an $ajax namespace to the Vue instance, which then allows to make ajax requests.
 */
export default {
  install(Vue) {
    Vue.prototype.$ajax = {
      post,
      get
    };
  }
};
