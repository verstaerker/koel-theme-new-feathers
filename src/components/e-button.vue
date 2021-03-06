<template>
  <component :is="type"
             :class="b(modifiers)"
             :style="style"
             v-bind="attributes"
             @mouseenter="onMouseEnter"
             @mouseleave="onMouseLeave"
             @mousedown="onMouseDown"
             @mouseup="onMouseUp"
             @focus="onFocus"
             @blur="onBlur"
             @click="onClick"
  >
    <!-- span is required to prevent content shifting in IE11. -->
    <span :class="b('inner')">
      <e-progress v-if="progress"
                  :spacing="0"
      />
      <!-- @slot Button content. -->
      <slot v-else></slot>
    </span>
  </component>
</template>

<script>
  import touchDevice from '../mixins/touch-device';
  import eProgress from './e-progress';
  import propScale from '@/helpers/prop.scale';

  /**
   * Renders a `<button>` or `<a>` element (based on existing `href` attribute) with button style.
   * The component uses a `<slot>` to render the content.
   *
   * [You can also define inherited attributes for `<button>`](https://developer.mozilla.org/de/docs/Web/HTML/Element/button#Attribute)
   *
   * [You can also define inherited attributes for `<a>`](https://developer.mozilla.org/de/docs/Web/HTML/Element/a#Attribute)
   */
  export default {
    name: 'e-button',
    // status: 1,

    components: {
      eProgress
    },
    mixins: [
      touchDevice,
    ],

    props: {
      /**
       * Defines the width of the button
       *
       * Valid values: `[full, auto]`
       */
      width: {
        type: String,
        default: null,
        validator(value) {
          return [
            'full',
            'auto',
          ].includes(value);
        },
      },

      /**
       * Modifies the inner spacing for the button.
       *
       * Valid values: `[0, 500, 600, 700]`
       */
      spacing: propScale(500, [
        0,
        500,
        600,
        700,
      ]),

      /**
       * If `true` the button gets the negative style
       */
      negative: {
        type: Boolean,
        default: false,
      },

      /**
       * If `true` the button shows a progress animation
       */
      progress: {
        type: Boolean,
        default: false,
      },

      /**
       * A flag to toggle between primary and secondary styling
       */
      primary: {
        type: Boolean,
        default: false,
      },

      /**
       * Forces the hover state
       */
      hover: {
        type: Boolean,
        default: false,
      },

      /**
       * Forces the focus state
       */
      focus: {
        type: Boolean,
        default: false,
      },

      /**
       * Forces the active state
       */
      active: {
        type: Boolean,
        default: false,
      },

      /**
       * Disables the button
       */
      disabled: {
        type: Boolean,
        default: false,
      },
    },

    data() {
      return {
        /**
         * @type {Boolean} Internal flag to determine hover state.
         */
        hasHover: this.hover,

        /**
         * @type {Boolean} Internal flag to determine active state.
         */
        isActive: this.active,

        /**
         * @type {Boolean} Internal flag to determine focus state.
         */
        hasFocus: this.focus,

        /**
         * Sets the element type for the component.
         */
        type: this.$attrs.href ? 'a' : 'button',
      };
    },

    computed: {
      modifiers() {
        return {
          width: this.width,
          spacing: this.spacing,
          negative: this.negative,
          progress: this.progress,
          disabled: this.disabled,
          primary: this.primary,
          hover: this.hover || this.hasHover,
          focus: this.focus || this.hasFocus,
          active: this.active || this.isActive,
          touch: this.hasTouch,
        };
      },

      attributes() {
        return {
          role: this.$attrs.href ? 'button' : null, // Fallback
          ...this.$attrs,
          disabled: this.disabled || this.progress,
        };
      },

      style() {
        return this.progress && this.width !== 'full'
          ? this.getElementDimensions()
          : null;
      }
    },
    // watch: {},

    // beforeCreate() {},
    // created() {},
    // beforeMount() {},
    // mounted() {},
    // beforeUpdate() {},
    // updated() {},
    // activated() {},
    // deactivated() {},
    // beforeDestroy() {},
    // destroyed() {},

    methods: {
      /**
       * Mouseenter event handler.
       */
      onMouseEnter() {
        this.hasHover = true;
      },

      /**
       * Mouseleave event handler.
       */
      onMouseLeave() {
        this.hasHover = false;
        this.isActive = false;
      },

      /**
       * Mousedown event handler.
       */
      onMouseDown() {
        this.isActive = true;
      },

      /**
       * Mouseup event handler.
       */
      onMouseUp() {
        this.isActive = false;
      },

      /**
       * Focus event handler.
       */
      onFocus() {
        this.hasFocus = true;
      },

      /**
       * Blur event handler.
       */
      onBlur() {
        this.hasHover = false;
        this.hasFocus = false;
      },

      /**
       * Click event handler.
       *
       * @param {Event} event - The click event instance.
       */
      onClick(event) {
        this.$el.blur();

        /**
         * Click event
         *
         * @event click
         *
         * @property {Event} event - The original DOM event.
         */
        this.$emit('click', event);
      },

      /**
       * Returns the current width and height of the button.
       *
       * @returns {Object}
       */
      getElementDimensions() {
        const element = this.$el;

        return element
          ? { width: `${element.offsetWidth}px`, height: `${element.offsetHeight}px` }
          : null;
      },
    },
  };
</script>

<style lang="scss">
  $_e-button__radius: 3px;

  .e-button {
    @include font(14, 18, $font-weight--semi-bold);

    position: relative;
    display: inline-block;
    background: transparent;
    padding: 6px $spacing--10;
    color: $color-grayscale--1000;
    border: 1px solid $color-grayscale--200;
    border-radius: $_e-button__radius;
    outline: none;
    min-width: 165px;
    text-align: center;
    cursor: pointer;

    &:hover {
      text-decoration: none;
    }

    &--focus,
    &:focus {
      color: $color-primary--3;
      background-color: $color-grayscale--500;
    }

    &:active:not([disabled]),
    &--active:not([disabled]) {
      color: $color-primary--3;
      background-color: $color-grayscale--400;
      position: relative;
    }

    &--hover:not(&--touch),
    &:hover:not(&--touch) {
      color: $color-grayscale--400;
    }

    &[disabled],
    &--disabled,
    &[disabled]:hover,
    &--disabled:hover {
      background-color: transparent;
      border-color: $color-grayscale--200;
      color: $color-grayscale--200;
      cursor: default;
      pointer-events: none;
    }

    &--width-full {
      display: block;
      width: 100%;
    }

    &--width-auto {
      min-width: 0;
    }

    &--negative {
      background: $color-primary--2;
      color: $color-primary--3;
    }

    &--spacing-0 {
      padding: 0;
    }

    &--spacing-600 {
      padding-left: $spacing--40;
      padding-right: $spacing--40;
    }

    &--spacing-700 {
      padding-left: $spacing--70;
      padding-right: $spacing--70;
    }

    &--progress,
    &--progress[disabled],
    &--progress[disabled]:hover,
    &--progress[disabled]:focus,
    &--progress:hover,
    &--progress:focus {
      background-color: $color-grayscale--100;
      overflow: hidden; // Prevents overflow of animation
    }

    &__inner {
      position: relative;
      display: inline-block;
      vertical-align: baseline;
    }
  }

  .e-button--primary {
    border-color: transparent;

    &:not([disabled]) {
      color: $color-grayscale--1000;
      background: $color-primary--1;

      &.e-button:focus,
      &.e-button--focus {
        background-color: darken($color-primary--1, 5%);
      }

      &.e-button:hover:not(.e-button--touch),
      &.e-button--hover:not(.e-button--touch) {
        background-color: darken($color-primary--1, 5%);
      }

      &.e-button:active:not([disabled]),
      &.e-button--active:not([disabled]) {
        color: $color-grayscale--1000;
        background: $color-primary--1;
      }
    }

    &.e-button--progress,
    &.e-button--progress[disabled],
    &.e-button--progress[disabled]:hover,
    &.e-button--progress[disabled]:focus,
    &.e-button--progress:hover,
    &.e-button--progress:focus {
      background-color: $color-secondary--2;
      display: flex;
      justify-content: center;
    }
  }
</style>
