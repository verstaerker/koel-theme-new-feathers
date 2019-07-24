<template>
  <button
    v-bind="this.$attrs"
    :class="b()"
    :title="title"
    :style="style"
    @click="$emit('click')"
  ></button>
</template>

<script>
  export default {
    name: 'e-circular-button',
    // status: 1,

    // components: {},
    // mixins: [],

    props: {
      title: {
        type: String,
        required: true,
      },
      icon: {
        type: String,
        required: true,
      },
      width: {
        type: [Number, String],
        default: 50
      },
      height: {
        type: [Number, String],
        default: 50
      }
    },
    data() {
      const { width, height, icon } = this.$props;

      return {
        style: {
          width: `${width}px`,
          height: `${height}px`,
          backgroundImage: `url("/src/assets/icons/${icon}.svg")`,
        }
      };
    },

    // computed: {},
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
  .e-circular-button {
    @extend %button-reset;

    border-radius: 50%;
    border: 1px solid $color-grayscale--1000;
    background: no-repeat center center;
    background-size: 50%;
  }
</style>
