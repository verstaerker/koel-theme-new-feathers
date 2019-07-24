<template>
  <div :class="b()">
    <section :class="b('album-list', { minimized: !isActive })">
      <header :class="b('header')">
        <e-input
          v-model.trim="searchTerm"
          name="Search"
          type="search"
          placeholder="Search..."
        />
      </header>
      <c-album-grid
        :albums="albums"
        :minimized="!isActive"
      />
    </section>
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
    data() {
      return {
        searchTerm: '',
      };
    },

    computed: {
      albums() {
        const searchTerm = this.searchTerm.toLowerCase();

        return searchTerm
          ? Album
            .query()
            .where('name', value => value.toLowerCase().includes(searchTerm))
            .get()
          : Album.all();
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
    max-height: 100%;

    &__header {
      padding-bottom: $spacing--20;
    }

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
      overflow: auto;
    }
  }
</style>
