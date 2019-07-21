<template>
  <h1 :is="tag" :class="b(modifiers)" v-bind="$attrs">
    <span :class="b('inner', innerModifiers)">
      <slot></slot>
    </span>
  </h1>
</template>

<script>
  import propScale from '@/helpers/prop.scale';

  export default {
    name: 'e-heading',
    // status: 1,

    // components: {},
    // mixins: [],

    props: {
      /**
       * Defines the color of the heading (h1-h6).
       *
       * Valid values: `[blue, gray]`
       */
      color: {
        type: String,
        default: 'white',
        validator(value) {
          return [
            'white',
          ].includes(value);
        },
      },

      /**
       * Defines the tag of the heading (h1-h6).
       *
       * Valid values: `[h1, h2, h3, h4, h5, h6]`
       */
      tag: {
        type: String,
        default: 'h1',
        validator(value) {
          return [
            'h1',
            'h2',
            'h3',
            'h4',
            'h5',
            'h6',
          ].includes(value);
        },
      },

      /**
       * Defines the font-weight
       *
       * Valid values: `[normal, semibold, bold]`
       */
      fontWeight: {
        type: String,
        required: false,
        default: null,
        validator(value) {
          return [
            'normal',
            'semibold',
            'bold',
          ].includes(value);
        },
      },

      /**
       * Defines spacing for the heading element.
       *
       * Valid values: `[400, 500, 700, 800]`
       */
      spacing: propScale(500, [
        400,
        500,
        700,
        800,
      ]),

      /**
       * Defines if the heading shall be uppercase.
       */
      uppercase: {
        type: Boolean,
        default: false,
      },
    },

    computed: {
      /**
       * Returns an Object of class modifiers for the root element.
       *
       * @returns {Object}
       */
      modifiers() {
        const {
          color,
          underline,
          uppercase,
          fontWeight,
          spacing
        } = this.$props;

        return {
          color,
          underline,
          uppercase,
          fontWeight,
          spacing,
          [this.$props.tag]: true
        };
      },

      /**
       * Returns an Object of class modifiers for the inner wrapper.
       *
       * @returns {Object}
       */
      innerModifiers() {
        const {
          color,
          spacing
        } = this.$props;

        return {
          color,
          spacing
        };
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

    // methods: {},
    // render() {},
  };
</script>

<style lang="scss">
  .e-heading {
    display: block;

    &__inner {
      display: inline-block;
    }

    &__inner a {
      color: $color-secondary--1;
      text-decoration: none;
    }

    &--uppercase {
      text-transform: uppercase;
    }

    &--font-weight-normal {
      font-weight: $font-weight--regular;
    }

    &--font-weight-semibold {
      font-weight: $font-weight--semi-bold;
    }

    &--font-weight-bold {
      font-weight: $font-weight--bold;
    }

    &--color-white {
      color: $color-grayscale--1000;
    }
  }
</style>
