<template>
  <div :class="b({ [type]: true })">
    <router-link :to="{ name: 'albumDetail', params: { albumId: album.$id }}">
      <figure :class="b('cover')">
        <img :class="b('cover-image')" :src="album.cover" :alt="`Cover for '${album.name}`">
        <figcaption :class="b('name')">
          {{ album.name }}
        </figcaption>
      </figure>
    </router-link>
    <div :class="b('play')"></div>
  </div>
</template>

<script>

  /**
   * A single album item for the c-album-grid.
   */
  export default {
    name: 'c-album',
    // status: 1,

    // components: {},
    // mixins: [],

    props: {
      /**
       * The related album data.
       */
      album: {
        type: Object,
        required: true
      },
      type: {
        type: String,
        default: 'grid'
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
  .c-album {
    $this: &;

    &:hover {
      #{$this}__name {
        opacity: 1;
      }
    }

    &__cover {
      display: flex;
      align-items: center;

      @include media(md) {
        display: block;
        position: relative;
      }
    }

    &__cover-image {
      width: 25%;
      max-width: 50px;
      margin-right: $spacing--10;

      @include media(md) {
        width: auto;
        max-width: 100%;
      }
    }

    &__name {
      position: static;
      opacity: 1;
      background: transparent;
      color: $color-grayscale--700;
      text-align: left;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;

      @include media(md) {
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        padding: $spacing--5;
        background: rgba($color-grayscale--0, 0.5);
        text-align: center;
        opacity: 0;
        transition: opacity 0.5s;
      }
    }

    &--list {
      #{$this}__cover {
        display: flex;
        align-items: center;
      }

      #{$this}__cover-image {
        width: 25%;
        max-width: 50px;
        margin-right: $spacing--10;
      }

      #{$this}__name {
        position: static;
        opacity: 1;
        background: transparent;
        text-align: left;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
</style>
