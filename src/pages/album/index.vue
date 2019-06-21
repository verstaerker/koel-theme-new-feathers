<template>
  <div :class="b()">
    <c-album-grid :albums="albums" />
  </div>
</template>

<script>
  import cAlbumGrid from '@/components/c-album-grid';
  import Album from '@/store/models/Album';

  export default {
    name: 'albums',
    // status: 1,

    components: {
      cAlbumGrid,
    },
    // mixins: [],

    // props: {},
    // data() {
    //   return {};
    // },

    computed: {
      albums() {
        return Album.all();
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
  /* stylelint-disable selector-class-pattern */

  /* Todo: find a solution for route naming. */
  .albums {
    // ...
  }
</style>
