<template>
  <div :class="b(componentModifiers)">
    <div :class="b('spinners')">
      <div :class="b('spinner', { one: true })"></div>
      <div :class="b('spinner', { two: true })"></div>
    </div>
    <span class="invisible">
      {{ loadingMessage }}
    </span>
  </div>
</template>

<script>
  import propScale from '@/helpers/prop.scale';

  export default {
    name: 'e-progress',
    // status: 1,

    // components: {},
    // mixins: [],

    props: {
      /**
       * Inverts the loading style
       */
      negative: {
        type: Boolean,
        default: false
      },

      /**
       * Sets the inner spacing for the animation
       *
       * Valid values: `[0, 500]`
       */
      spacing: propScale(500, [
        0,
        500
      ]),

      /**
       * Defines a fallback message. "e-progress.loading" is used by default
       */
      message: {
        type: String,
        default: null // Translation can not be set here because it will not be computed
      }
    },
    // data() {
    //   return {};
    // },

    computed: {
      loadingMessage() {
        return this.message || this.$i18n.t('e-progress.loading');
      },

      /**
       * Returns all modifiers for the component main class.
       *
       * @returns {Object}
       */
      componentModifiers() {
        return {
          negative: this.negative,
          spacing: this.spacing,
        };
      },
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

    // methods: {},
    // render() {},
  };
</script>

<style lang="scss">
  @mixin e-progress-bounce($dur: 0.5s, $delay: 0s) {
    animation: e-progress-bounce $dur ease $delay infinite;
  }

  .e-progress {
    $bar-width: 4px;
    $bar-height: 1em;
    $bar-radius: 0;

    %e-progress-bar {
      width: $bar-width;
      height: $bar-height;
      border-radius: $bar-radius;
    }

    &__spinners {
      display: flex;
    }

    &__spinner { // Inspired by https://codepen.io/arthurcamara1/pen/LpNwyq
      @extend %e-progress-bar;
      @include e-progress-bounce(0.6s, 0.1s);

      display: block;
      position: relative;
      background: $color-grayscale--0;
      height: $bar-height;
      margin: 0 ($bar-width + $bar-width/2 + 1px);
      background-color: $color-secondary--1;

      &::before,
      &::after {
        @extend %e-progress-bar;

        content: "";
        position: absolute;
        display: block;
        bottom: 0;
      }

      &::before {
        left: -1 * ($bar-width + $bar-width/2);
      }

      &::after {
        left: $bar-width + $bar-width/2;
      }

      &--one {
        &::before {
          @include e-progress-bounce(0.6s, 0s);

          background-color: $color-secondary--2;
        }

        &::after {
          @include e-progress-bounce(0.6s, 0.2s);

          background-color: $color-secondary--3;
        }
      }

      &--two {
        background-color: $color-secondary--5;
        margin-right: 0;

        &::before {
          @include e-progress-bounce(0.6s, 0s);

          background-color: $color-secondary--4;
        }

        &::after {
          display: none;
        }
      }
    }

    @keyframes e-progress-bounce {
      0% {
        height: 5px;
        margin-top: calc(#{$bar-height} - 5px);
      }

      50% {
        height: $bar-height;
        margin-top: 0;
      }

      100% {
        height: 5px;
        margin-top: calc(#{$bar-height} - 5px);
      }
    }
  }
</style>
