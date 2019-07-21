<template>
  <div :class="b()">
    <div :class="b('album-list', { minimized: !isActive })">
      <c-album-grid
        :albums="albums"
        :minimized="!isActive"
      />
    </div>
    <transition name="route-slide">
      <div v-if="this.$route.params.albumId" :class="b('detail')">
        <router-view />
      </div>
    </transition>
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
      },
      isActive() {
        const { matched } = this.$route;

        return matched[matched.length - 1].components.default.name === this.$options.name;
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
  .albums {
    display: flex;
    flex-direction: row;

    &__album-list {
      flex: 1 1 percentage(1 / 3);

      &--minimized {
        max-width: percentage(1 / 3);
      }
    }

    &__detail {
      flex: 1 1 percentage(2 / 3);
      max-width: percentage(2 / 3);
      margin-left: $spacing--20;
    }
  }
</style>
