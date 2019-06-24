<template>
  <l-default>
    <c-player />
    <router-view />
  </l-default>
</template>

<script>
  import CPlayer from '@/components/c-player';

  /**
   * The root component for the Vue app.
   */
  export default {
    name: 'c-app',
    components: { CPlayer },
    // status: 1,

    // components: {},
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
  .c-app {
    // ...
  }
</style>
