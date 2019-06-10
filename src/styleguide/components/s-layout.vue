<template>
  <div :class="b()">
    <router-view />
    <s-navigation :routes="$router.options.routes" nav-position="bottom-right" />
  </div>
</template>

<script>
  import sNavigation from '@/styleguide/components/s-navigation';

  export default {
    name: 's-layout',
    // status: 1,

    components: {
      sNavigation,
    },
    // mixins: [],

    // props: {},
    // data() {
    //   return {};
    // },

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
  .s-layout > :first-child {
    height: 100vh;
  }
</style>
