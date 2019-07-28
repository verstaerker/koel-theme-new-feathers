<template>
  <ul :class="b()">
    <li
      v-for="artist in artists"
      :key="artist.$id"
      :class="b('artist')"
    >
      <router-link
        :to="{ name: 'artistDetail', params: { artistId: artist.$id }}"
        :class="b('detail-link')"
      >
        <dl>
          <dt :class="b('artist-name')">
            {{ artist.name }}
          </dt>
          <dd :class="b('artist-info-wrapper')">
            <ul :class="b('artist-info')">
              <li
                v-t="{ path: 'c-artist-list.albums', args: { count: artist.albums.length }}"
                :class="b('artist-info-item')"
              ></li>
              <li
                v-t="{ path: 'c-artist-list.songs', args: { count: artist.albums.length }}"
                :class="b('artist-info-item')"
              ></li>
            </ul>
          </dd>
        </dl>
      </router-link>
    </li>
  </ul>
</template>

<script>
  import Artist from '@/store/models/Artist';

  export default {
    name: 'c-artist-list',
    // status: 1,

    // components: {},
    // mixins: [],

    // props: {},
    // data() {
    //   return {};
    // },

    computed: {
      artists() {
        return Artist
          .query()
          .with(['albums', 'songs'])
          .get();
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
  .c-artist-list {
    @extend %list-reset;

    width: 100%;

    &__artist {
      background-color: transparent;
      transition: background-color 1s;

      &:hover {
        background-color: rgba(255, 255, 255, 0.2);
      }
    }

    &__detail-link {
      display: block;
      padding: $spacing--5;
      color: $color-grayscale--1000;

      &:hover {
        color: $color-grayscale--1000;
      }
    }

    &__artist-info {
      @extend %list-reset;

      display: flex;
    }

    &__artist-info-item:not(:first-child) {
      margin-left: $spacing--10;
    }
  }
</style>
