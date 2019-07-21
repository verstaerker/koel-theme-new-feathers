<template>
  <h1 :is="tagName" :class="b(modifiers)" v-bind="$attrs">
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
       * Defines the tagname of the heading (h1-h6).
       *
       * Valid values: `[h1, h2, h3, h4, h5, h6]`
       */
      tagName: {
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
       * Defines if the heading should have an underline.
       */
      underline: {
        type: Boolean,
        default: false,
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
          [this.$props.tagName]: true
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
    @include font($font-size--36, 22px, $font-weight--regular);

    display: block;

    &__inner {
      display: inline-block;
    }

    &__inner a {
      color: $color-secondary--1;
      text-decoration: none;
    }

    &--underline &__inner {
      border-bottom: 1px solid $color-primary--1;

      @include media(sm) {
        padding: $spacing--15 $spacing--20;
      }
    }

    &--underline &__inner--color-gray {
      border-bottom: 1px solid $color-grayscale--600;
    }

    &--underline &__inner--spacing-400 {
      padding: $spacing--10 $spacing--20;
    }

    &--underline &__inner--spacing-500 {
      padding: $spacing--15 $spacing--10;
    }

    &--underline &__inner--spacing-700 {
      padding: $spacing--20 $spacing--20 $spacing--5;
    }

    &--underline &__inner--spacing-800 {
      padding: $spacing--20 $spacing--25 $spacing--5;
    }

    &--uppercase {
      text-transform: uppercase;
    }

    &--h1 {
      @include font($font-size--36);
    }

    &--h2 {
      @include font($font-size--24);
    }

    &--h3 {
      @include font($font-size--14);
    }

    &--h4 {
      @include font($font-size--14);

      font-weight: $font-weight--bold;
    }

    &--h5 {
      @include font($font-size--14);

      font-weight: $font-weight--semi-bold;
    }

    &--h6 {
      @include font($font-size--14);
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
