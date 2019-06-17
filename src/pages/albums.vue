<template>
  <div :class="b()">
    <c-album-grid :albums="getAlbums" />
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import CAlbumGrid from '@/components/c-album-grid';

  export default {
    name: 'albums',
    // status: 1,

    components: {
      CAlbumGrid,
    },
    // mixins: [],

    // props: {},
    // data() {
    //   return {};
    // },

    computed: {
      ...mapGetters('album', [
        'getAlbums'
      ]),
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
  /* stylelint-disable selector-class-pattern */

  /* Todo: find a solution for route naming. */
  .albums {
    // ...
  }
</style>
