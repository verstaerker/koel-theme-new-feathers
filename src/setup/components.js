// Form elements
import eLabel from '@/components/e-label';
import eInput from '@/components/e-input';
import eSelect from '@/components/e-select';
// import eRadio from '@/components/e-radio';
import eCheckbox from '@/components/e-checkbox';
// import eTextarea from '@/components/e-textarea';
import eButton from '@/components/e-button';

// Elements
import eIcon from '@/components/e-icon';
// import ePicture from '@/components/e-picture';
// import eHeading from '@/components/e-heading';
// import eProgress from '@/components/e-progress';
// import eLink from '@/components/e-link';

// Components
import cModal from '@/components/c-modal';

// Twig related imports
import lDefault from '@/components/l-default';

// Import style only 'components'.
require.context('@/components', false, /\.scss/);

export default {
  install(Vue) {
    const components = [
      eLabel,
      eInput,
      eSelect,
      // eRadio,
      eCheckbox,
      // eTextarea,
      eButton,
      eIcon,
      // ePicture,
      // eHeading,
      // eProgress,
      cModal,
      lDefault,
      // eLink,
    ];

    // This improves component usage in PhpStorm, while keeping optimized import in production
    if (process.env.NODE_ENV === 'production') {
      components.forEach((component) => {
        Vue.component(component.name, component);
      });
    } else {
      Vue.component(eLabel.name, eLabel);
      Vue.component(eInput.name, eInput);
      Vue.component(eSelect.name, eSelect);
      // Vue.component(eRadio.name, eRadio);
      Vue.component(eCheckbox.name, eCheckbox);
      // Vue.component(eTextarea.name, eTextarea);
      Vue.component(eButton.name, eButton);
      Vue.component(eIcon.name, eIcon);
      // Vue.component(ePicture.name, ePicture);
      // Vue.component(eHeading.name, eHeading);
      // Vue.component(eProgress.name, eProgress);
      Vue.component(cModal.name, cModal);
      Vue.component(lDefault.name, lDefault);
      // Vue.component(eLink.name, eLink);
    }
  },
};
