<template>
  <ul :class="b({ minimized })">
    <li
      v-for="album in albums"
      :key="album.id"
      :class="b('item', { active: album.id === $route.params.albumId })"
    >
      <c-album
        :album="album"
        :type="minimized ? 'list' : 'grid'"
      />
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
      },
      minimized: {
        type: Boolean,
        default: false
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
    $this: &;

    @extend %list-reset;

    overflow: auto;

    @include media(md) {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      grid-gap: $spacing--20;
    }

    &__item {
      max-width: 100%;
    }

    &__cover {
      max-width: 100%;
    }

    &--minimized {
      display: block;

      #{$this}__item {
        &:hover {
          background: $color-grayscale--200;
        }

        &--active {
          background: $color-grayscale--200;
        }
      }
    }
  }
</style>
