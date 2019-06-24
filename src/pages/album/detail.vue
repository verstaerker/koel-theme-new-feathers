<template>
  <div :class="b()">
    <e-button v-if="selectedSongs" @click="onAddClick">
      Add to playlist
    </e-button>
    <c-table :items="songs"
             :headers="headers"
             :pagination="pagination"
             is-selectable
             @onChangeSelected="onChangeSelected"
    />
  </div>
</template>

<script>
  import { mapMutations } from 'vuex';
  import Album from '@/store/models/Album';
  import Song from '@/store/models/Song';
  import CTable from '@/components/c-table';

  export default {
    name: 'albums',
    components: { CTable },
    // status: 1,

    // components: {},
    // mixins: [],

    // props: {},
    data() {
      return {
        headers: [
          { text: this.$t('album.detail.colTrack'), value: 'track' },
          { text: this.$t('album.detail.colTitle'), value: 'title' },
          { text: this.$t('album.detail.colDisc'), value: 'disc' },
          { text: this.$t('album.detail.colRuntime'), value: 'runtime' },
        ],
        pagination: {
          sortBy: 'track'
        },
        selectedSongs: null,
      };
    },

    computed: {
      album() {
        const albumId = this.$route.params.id;

        return Album
          .query()
          .withAllRecursive()
          .find(albumId) || {};
      },
      songs() {
        return this.album.songs || [];
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
  .albums {
    // ...
  }
</style>
