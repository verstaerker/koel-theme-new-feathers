<template>
  <!-- Todo: simplify template-->
  <div :class="b(modifiers)">
    <input v-if="uncontrolled"
           ref="input"
           :autocomplete="autocomplete"
           :class="b('field')"
           :disabled="disabled"
           :name="name"
           :title="title"
           v-bind="$attrs"
           @blur="onBlur"
           @focus="onFocus"
           @input="onInput"
           @keyup.enter="onEnterKeyUp"
           @mouseenter="hasHover = true"
           @mouseleave="hasHover = false"
           @keyup.up="onArrowKeyUp"
           @keyup.down="onArrowKeyUp"
    >
    <input v-else
           ref="input"
           :autocomplete="autocomplete"
           :class="b('field')"
           :disabled="disabled"
           :name="name"
           :value="standalone ? internalValue : value"
           :title="title"
           v-bind="$attrs"
           @blur="onBlur"
           @focus="onFocus"
           @input="onInput"
           @keyup.enter="onEnterKeyUp"
           @mouseenter="hasHover = true"
           @mouseleave="hasHover = false"
           @keyup.up="onArrowKeyUp"
           @keyup.down="onArrowKeyUp"
    >

    <span v-if="$slots.fixedLabel" ref="fixedLabel" :class="b('fixed-label')">
      <!-- @slot Use this slot for a fixed label inside the input field. -->
      <slot name="fixedLabel"></slot>
    </span>
    <div v-if="showNotification" :class="b('notification')">
      <!-- eslint-disable-next-line vue/no-v-html -->
      <c-form-notification v-html="notification" :state="state" />
    </div>
  </div>
</template>

<script>
  import cFormNotification from '@/components/c-form-notification';
  import formStates from '../mixins/form-states';
  import propScale from '@/helpers/prop.scale';

  /**
   * Input form component
   */
  export default {
    name: 'e-input',
    // status: 1,

    components: {
      cFormNotification
    },
    mixins: [formStates],
    inheritAttrs: false,

    props: {

      /**
       * Value passed by v-model
       */
      value: {
        default: null,
        type: [String, Number],
      },

      /**
       * Adds name attribute
       */
      name: {
        required: true,
        type: String,
      },

      /**
       *  Adds title attribute
       */
      title: {
        default: null,
        type: String
      },

      /**
       * Adds autocomplete
       * Please refer to:
       * [HTML5 input autocomplete](https://developer.mozilla.org/de/docs/Web/HTML/Element/Input#attr-autocomplete)
       */
      autocomplete: {
        type: String,
        default: 'off',
      },

      /**
       * Defines the notification content in a state container bellow the input field
       */
      notification: {
        type: String,
        default: null
      },

      /**
       * Defines the border Style
       *
       * Available values: [0, 500]
       * Default: 500
       */
      border: propScale(500, [
        0,
        500,
      ]),

      /**
       * Option for selecting value text on focus.
       */
      selectOnFocus: {
        type: Boolean,
        default: false
      },

      /**
       * Hides the native browser control with CSS.
       *
       * Currently supported: `input[type="number"]`
       */
      noNativeControl: {
        type: Boolean,
        default: false,
      },

      /**
       * Allows to use the input as standalone.
       *
       * If 'true'
       * - $props.value will be used to set initial value.
       * - the component is not reactive to $props.value changes.
       */
      standalone: {
        type: Boolean,
        default: false
      },

      /**
       * Lets input handle value itself. This is used as in some cases the IE11 couldn't handle new input values
       * (e.g. skipped random keystrokes in searchSuggestion field).
       */
      uncontrolled: {
        type: Boolean,
        default: false
      },
    },

    data() {
      return {
        internalValue: this.value
      };
    },
    computed: {
      showNotification() {
        return this.state && this.state !== 'default' && this.notification && this.hasFocus;
      },

      /**
       * Defines state modifier classes.
       *
       * @returns  {Object}   BEM classes
       */
      modifiers() {
        const {
          border,
          noNativeControl,
          notification
        } = this;

        return {
          ...this.stateModifiers,
          notification: notification && this.hasFocus,
          type: this.$attrs.type || 'text',
          border,
          noNativeControl,
        };
      },
    },
    // watch: {},

    // beforeCreate() {},
    // created() {},
    // beforeMount() {},
    mounted() {
      this.setFixedLabelSpacings();
      setTimeout(this.setFixedLabelSpacings, 200);

      if (this.uncontrolled && this.$refs.input) {
        this.$refs.input.value = this.standalone ? this.internalValue : this.value;
      }
    },
    // beforeUpdate() {},
    updated() {
      setTimeout(this.setFixedLabelSpacings);
    },
    // activated() {},
    // deactivated() {},
    // beforeDestroy() {},
    // destroyed() {},

    methods: {
      /**
       * Emits input to parent component.
       *
       * @param   {String}  event   Field input
       */
      onInput(event) {
        this.internalValue = event.target.value;

        /**
         * input event fires on input
         *
         * @event input
         */
        this.$emit('input', event.target.value);
      },

      /**
       * Emits focus to parent and wrapper component.
       * Update "hasFocus" state.
       *
       * @param {Event} event - The DOM event.
       */
      onFocus(event) {
        this.hasFocus = true;

        if (this.$props.selectOnFocus) {
          this.selectValue(event);
        }

        /**
         * "focus" event fires on focus.
         *
         * @event focus
         */
        this.$emit('focus');
        this.$parent.$emit('focus');
      },

      /**
       * Emits blur to parent and wrapper component.
       * Update "hasFocus" state.
       */
      onBlur() {
        this.hasFocus = false;

        /**
         * blur event fires on blur
         *
         * @event blur
         */
        this.$emit('blur');
        this.$parent.$emit('blur');
      },

      /**
       * Emits enter key event to parent and wrapper component.
       */
      onEnterKeyUp() {
        /**
         * Enter keyboard event gets fired if user clicks on enter or num-pad enter.
         *
         * @event enter
         */
        this.$emit('enter');
        this.$parent.$emit('enter');
      },

      /**
       * Calculates the width of the fixed label and sets it as padding-left to the input field.
       */
      setFixedLabelSpacings() {
        if (this.$refs.fixedLabel) {
          const labelWidth = this.$refs.fixedLabel.clientWidth;

          this.$refs.input.style.paddingLeft = `${labelWidth + 10}px`;
        }
      },

      /**
       * Selects the value of the input field.
       */
      selectValue() {
        if (this.$props.value) {
          // Needed to select a number value on Chrome.
          this.$refs.input.select();

          // Timeout is needed that it works on all browsers (without there are problems on Safari, Edge, iOS)
          if ('ontouchstart' in window) {
            setTimeout(() => {
              this.$refs.input.setSelectionRange(0, this.$props.value.length);
            });
          }
        }
      },

      /**
       * Handles the bubbling of the arrow key (up/down).
       *
       * @param {Event} event - The DOM Event.
       */
      onArrowKeyUp(event) {
        this.$emit('onArrowKeyUp', event);
      }
    }
    // render() {},
  };
</script>

<style lang="scss">
  // stylelint-disable no-descending-specificity
  // TODO: refactor style to get rid of no-descending-specificity

  $e-input-height: 30px;

  .e-input {
    $this: &;

    position: relative;

    &--border-0 &__field {
      border: 1px solid transparent;
    }

    // input
    &__field {
      @include font($font-size--14, 18px);

      border-radius: $border-radius--default;
      border: 1px solid transparent;
      color: $color-grayscale--1000;
      font-family: $font-family--primary;
      height: $e-input-height;
      position: relative;
      transition: box-shadow $transition-duration-200 ease-in-out;
      width: 100%;
      padding: $spacing--5 $spacing--10;
      background: rgba(255, 255, 255, 0.2);

      // disable iPhone styling
      -webkit-appearance: none;

      // sets proper input color for safari
      -webkit-text-fill-color: initial;
    }

    // remove x on in put field within IE
    &__field::-ms-clear {
      display: none;
      height: 0;
      width: 0;
    }

    // Hide autofill Safari icon
    // noinspection CssInvalidPseudoSelector
    &__field::-webkit-contacts-auto-fill-button {
      visibility: hidden;
      pointer-events: none;
      position: absolute;
      right: 0;
    }

    // placeholder (has to be split in seperate blocks to work on each browser)
    &__field::-webkit-input-placeholder { // WebKit, Blink, Edge
      color: $color-grayscale--400;
      opacity: 1;
    }

    &__field:-moz-placeholder { // Mozilla Firefox 4 to 18
      color: $color-grayscale--400;
      opacity: 1;
    }

    &__field::placeholder { // Most modern browsers support this now
      color: $color-grayscale--400;
      opacity: 1;
    }

    &__field:-ms-input-placeholder { // IE 11
      color: $color-grayscale--400;
      opacity: 1;
    }

    &__fixed-label {
      @include font($font-size--14, 18px);

      color: $color-grayscale--400;
      position: absolute;
      left: $spacing--5;
      top: 50%;
      transform: translateY(-50%);
      display: flex;
    }

    &__icon-splitter {
      border-left: 1px solid;
      margin: 0 $spacing--5;
    }

    &__notification {
      @include z-index(form-notification);

      position: absolute;
      width: 100%;
      top: calc(#{$e-input-height} - 1px);
    }

    &__slot-wrapper {
      position: absolute;
      right: $spacing--5;
      top: 50%;
      transform: translateY(-50%);
      display: flex;
    }

    &__slot {
      @include font($font-size--14);

      display: flex;
      line-height: $e-input-height;
      color: $color-grayscale--400;
    }

    // active
    &:not(&--border-0) &__field:active,
    &--active:not(&--border-0) &__field {
      border-color: $color-secondary--2;
    }

    // focus
    &:not(&--border-0) &__field:focus,
    &--focus:not(&--border-0) &__field {
      border-color: $color-secondary--2;
    }

    // hover
    &:not(&--border-0) &__field:hover,
    &--hover:not(&--border-0) &__field {
      border-color: $color-secondary--3;
    }

    // disabled
    &__field:disabled,
    &:not(&--border-0) &__field:disabled,
    &--disabled &__field,
    &--disabled:not(&--border-0) &__field,
    &--disabled &__field:hover,
    &--disabled:not(&--border-0) &__field:hover {
      border-color: $color-grayscale--600;
      color: $color-grayscale--450;

      &::placeholder {
        color: $color-grayscale--450;
      }
    }

    &--disabled {
      #{$this}__slot {
        color: $color-grayscale--450;
      }
    }

    /**
    * states
    **/
    &--state-default {
      .e-input__slot-wrapper {
        right: $spacing--5;
      }
    }

    &--state-error:not(.e-input--border-0) &__field {
      border-color: $color-status--danger;
    }

    &--state-error .e-input__icon-splitter {
      border-color: $color-status--danger;
    }

    &--state-error:not(.e-input--border-0) &__field:hover,
    &--state-error:not(.e-input--border-0) &__field:focus {
      border-color: $color-status--danger;
    }

    &--state-info {
      .e-input__icon-splitter {
        border-color: $color-grayscale--500;
      }
    }

    &--state-success {
      .e-input__icon-splitter {
        display: none;
      }
    }

    /*
     * Notification is visible
     */
    &--notification {
      .e-input__field {
        padding: $spacing--5 $spacing--10;
        background: none;
      }
    }

    .e-icon {
      display: flex;
      margin: auto;
    }

    &--type-hidden {
      display: none;
    }
  }

  .e-input--no-native-control {
    .e-input__field {
      // NOTE: FF also uses webkit style. But it will be overwritten by 'appearance' (and vendor prefixing).
      // 'none' must be used to remove native webkit shadow.
      -webkit-appearance: none;

      &::-webkit-inner-spin-button,
      &::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
    }

    .e-input__field::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }
</style>
