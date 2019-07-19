<template>
  <div :class="b()">
    <e-button v-if="selectedSongs" @click="onAddClick">
      Add to playlist
    </e-button>
    <figure :class="b('album')">
      <img :class="b('album-cover')" :src="album.cover">
      <figcaption>
        <dl>
          <dt>Name</dt>
          <dd>{{ album.name }}</dd>
        </dl>
      </figcaption>
    </figure>
    <table :class="b('songs')">
      <thead>
        <tr>
          <th v-for="column in columns" :key="column.field">
            {{ column.header }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="song in songs" :key="song.$id">
          <td v-for="column in columns" :key="column.field">
            {{ song[column.field] }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import { mapMutations } from 'vuex';
  import Album from '@/store/models/Album';
  import Song from '@/store/models/Song';

  export default {
    name: 'album-detail',
    // components: {},
    // status: 1,

    // components: {},
    // mixins: [],

    // props: {},
    data() {
      return {
        columns: [
          { header: this.$t('album.detail.colTrack'), field: 'track' },
          { header: this.$t('album.detail.colTitle'), field: 'title' },
          { header: this.$t('album.detail.colDisc'), field: 'disc' },
          { header: this.$t('album.detail.colRuntime'), field: 'runtime' },
        ],
        pagination: {
          sortBy: 'track'
        },
        selectedSongs: null,
      };
    },

    computed: {
      album() {
        const { albumId } = this.$route.params;

        return Album
          .query()
          .withAllRecursive()
          .find(albumId) || {};
      },
      songs() {
        const songs = this.album.songs || [];

        return songs.sort((a, b) => (a.track > b.track ? 1 : -1));
      },
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
      onChangeSelected(songs) {
        this.selectedSongs = songs;
      },
      onAddClick() {
        const songs = Array.isArray(this.selectedSongs) && this.selectedSongs.length
          ? Song.query().whereIdIn(this.selectedSongs).get()
          : [];

        this.setPlaylist(songs);
      }
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

    &__songs {
      width: 100%;
    }
  }
</style>
