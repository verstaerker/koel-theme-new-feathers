// Elements
import eIcon from '@/components/e-icon';
import eButton from '@/components/e-button';
import ePicture from '@/components/e-picture';
import eHeading from '@/components/e-heading';
import eInput from '@/components/e-input';
import eCheckbox from '@/components/e-checkbox';
import eLabel from '@/components/e-label';
import eProgress from '@/components/e-progress';
import eTextarea from '@/components/e-textarea';
import eRadio from '@/components/e-radio';
import eSelect from '@/components/e-select';
import eLink from '@/components/e-link';

// Components
import cModal from '@/components/c-modal';

// Twig related imports
import lDefault from '@/components/l-default';

// Import style only 'components'.
require.context('@/components', false, /\.scss/);

export default {
  install(Vue) {
    const components = [
      eButton,
      eIcon,
      ePicture,
      eHeading,
      eInput,
      eCheckbox,
      eLabel,
      eProgress,
      eTextarea,
      eRadio,
      cModal,
      eSelect,
      lDefault,
      eLink,
    ];

    // This improves component usage in PhpStorm, while keeping optimized import in production
    if (process.env.NODE_ENV === 'production') {
      components.forEach((component) => {
        Vue.component(component.name, component);
      });
    } else {
      Vue.component(eButton.name, eButton);
      Vue.component(eIcon.name, eIcon);
      Vue.component(ePicture.name, ePicture);
      Vue.component(eHeading.name, eHeading);
      Vue.component(eProgress.name, eProgress);
      Vue.component(eInput.name, eInput);
      Vue.component(eCheckbox.name, eCheckbox);
      Vue.component(eLabel.name, eLabel);
      Vue.component(eTextarea.name, eTextarea);
      Vue.component(eRadio.name, eRadio);
      Vue.component(cModal.name, cModal);
      Vue.component(eSelect.name, eSelect);
      Vue.component(lDefault.name, lDefault);
      Vue.component(eLink.name, eLink);
    }
  },
};
