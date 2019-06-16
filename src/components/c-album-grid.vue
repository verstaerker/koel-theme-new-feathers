<template>
  <ul :class="b()">
    <li v-for="album in albums" :key="album.id" :class="b('item')">
      <c-album :album="album" />
    </li>
  </ul>
</template>

<script>
  import CAlbum from '@/components/c-album';

  /**
   * Takes an Array of albums and shows them as  a grid.
   */
  export default {
    name: 'c-album-grid',
    components: { CAlbum },
    // status: 1,

    // components: {},
    // mixins: [],

    props: {
      /**
       * A list of albums to display.
       */
      albums: {
        type: Array,
        required: true
      }
    },
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
  .c-album-grid {
    @extend %list-reset;

    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-gap: $spacing--20;

    &__item {
      max-width: 100%;
    }

    &__cover {
      max-width: 100%;
    }
  }
</style>
