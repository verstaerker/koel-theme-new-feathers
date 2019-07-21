<template>
  <div :class="b()">
    <figure :class="b('album')">
      <img :class="b('album-cover')" :src="album.cover">
      <figcaption>
        <e-heading tag-name="h2">
          {{ album.name }}
        </e-heading>
      </figcaption>
    </figure>
    <c-song-list
      :filters="filters"
    />
  </div>
</template>

<script>
  import { mapMutations } from 'vuex';
  import Album from '@/store/models/Album';
  import EHeading from '@/components/e-heading';
  import CSongList from '@/components/c-song-list';

  export default {
    name: 'album-detail',
    components: { CSongList, EHeading },
    // components: {},
    // status: 1,

    // components: {},
    // mixins: [],

    // eslint-disable-next-line vue/require-prop-types
    props: ['albumId'],
    data() {
      return {
        columns: ['track', 'title', 'artist', 'runtime']
      };
    },

    computed: {
      album() {
        return Album
          .find(this.albumId) || {};
      },
      filters() {
        return [
          { field: 'album_id', value: parseInt(this.albumId, 10) }
        ];
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

    methods: {
      ...mapMutations('player', [
        'setPlaylist'
      ]),
    },
    // render() {},
  };
</script>

<style lang="scss">
  /* stylelint-disable selector-class-pattern */

  /* Todo: find a solution for route naming. */
  .album-detail {
    &__album {
      display: flex;
      margin-bottom: $spacing--50;
    }

    &__album-cover {
      width: 20%;
      max-width: 200px;
      margin-right: $spacing--40;
    }
  }
</style>
