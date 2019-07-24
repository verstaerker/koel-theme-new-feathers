<template>
  <section :class="b()">
    <header v-if="showHeader" :class="b('header')">
      <e-input
        v-model.trim="searchTerm"
        name="Search"
        type="search"
        placeholder="Search..."
      />
    </header>
    <table :class="b('table')">
      <thead>
        <tr>
          <th
            v-for="column in tableColumns"
            :key="column.field"
            :style="column.style"
          >
            {{ column.header }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="song in songList"
          :key="song.$id"
          :class="b('row', { active: song === getCurrentSong })"
          tabindex="0"
          role="button"
          @click="onPlayClick(song)"
          @keypress.enter="onPlayClick(song)"
        >
          <td
            v-for="(column, index) in tableColumns"
            :key="column.field"
            :class="b('cell')"
          >
            <button
              v-if="!index"
              v-t="'c-song-list.play'"
              :class="b('play-button')"
              tabindex="-1"
              @click="onPlayClick(song)"
            ></button>
            <span :class="b('cell-inner')" :title="song[column.field]">
              {{ song[column.field] }}
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex';
  import Song from '@/store/models/Song';

  export default {
    name: 'c-song-list',
    // status: 1,

    // components: {},
    // mixins: [],

    props: {
      /**
       * An array of field filters.
       *
       * e.g.
       * { field: 'album_id', value: 1 }
       */
      filters: {
        type: Array,
        default: null
      },

      /**
       * An Array of table columns which should be shown. Only columns which are defined inside 'data' are available.
       */
      columns: {
        type: Array,
        default: () => [
          'track',
          'runtime',
          'title',
          'albumName',
          'artistName',
          'disc',
        ]
      },

      /**
       * The field by which the songs should be sorted.
       */
      sortBy: {
        type: String,
        default: 'track'
      },

      /**
       * An alternative list of songs. Default are all available songs.
       *
       * Prefer 'filters' if possible.
       */
      songs: {
        type: Array,
        default: null,
      },

      showHeader: {
        type: Boolean,
        default: true,
      }
    },
    data() {
      const columns = {
        track: { header: this.$t('c-song-list.colTrack'), width: 1, },
        runtime: { header: this.$t('c-song-list.colRuntime'), width: 1 },
        title: { header: this.$t('c-song-list.colTitle'), width: 3 },
        albumName: { header: this.$t('c-song-list.colAlbum'), width: 3 },
        artistName: { header: this.$t('c-song-list.colArtist'), width: 3 },
        disc: { header: this.$t('c-song-list.colDisc'), width: 1 },
      };
      const tableColumns = [];
      let totalColumnWidth = 0;

      this.$props.columns.forEach((column) => {
        tableColumns.push({ field: column, ...columns[column] });
        totalColumnWidth += columns[column].width;
      });

      return {
        /**
         * An Array of columns which should be shown on the table.
         */
        tableColumns: tableColumns.map((column) => {
          column.style = {
            width: `${100 / totalColumnWidth * column.width}%`,
            maxWidth: `${100 / totalColumnWidth * column.width}%`
          };

          return column;
        }),
        searchTerm: ''
      };
    },

    computed: {
      ...mapGetters('player', [
        'getCurrentSong'
      ]),

      /**
       * Returns an Array of all or filtered songs.
       *
       * @returns {Array.<Object>}
       */
      songList() {
        if (this.songs) {
          return this.songs;
        }

        const { sortBy } = this;
        const searchTerm = this.searchTerm.toLowerCase();
        let songs = searchTerm
          ? Song // TODO: maybe it would be better to use an Accessor on the model to create the search reference.
            .query()
            .where(song => Object.values(song).join(' ').toLowerCase().includes(searchTerm))
            .get()
          : Song.all();

        if (Array.isArray(this.filters)) {
          this.filters.forEach((filter) => {
            songs = songs.filter(song => song[filter.field] === filter.value);
          });
        }

        return songs.sort((a, b) => (a[sortBy] > b[sortBy] ? 1 : -1));
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
      ...mapActions('player', [
        'replacePlaylist'
      ]),

      onPlayClick(song) {
        this.replacePlaylist({
          playlist: this.songList,
          playIndex: this.songList.indexOf(song),
          autoPlay: true,
        });
      },
    },
    // render() {},
  };
</script>

<style lang="scss">
  .c-song-list {
    $this: &;

    &__table {
      width: 100%;
      table-layout: fixed;
    }

    &__row {
      cursor: pointer;

      &--active {
        color: $color-primary--1;
      }
    }

    &__cell {
      position: relative;
      height: 2em;
    }

    &__cell-inner { // Tables don't allow to hide text overflow.
      position: absolute;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      line-height: 2;
      top: 0;
      left: 0;
      right: $spacing--10;
    }

    &__play-button {
      @extend %button-reset;

      content: "";
      position: absolute;
      display: block;
      width: 1.6em;
      height: 1.6em;
      margin: 0.2em 0;
      top: 0;
      left: 0;
      background: url("/src/assets/icons/i-play.svg") no-repeat 55% center;
      background-size: 50% 50%;
      border: 1px solid $color-grayscale--1000;
      border-radius: 50%;
      opacity: 0;
      text-indent: -200vw;
      overflow: hidden;
      pointer-events: none;

      #{$this}__row:hover &,
      #{$this}__row:focus & {
        opacity: 1;
      }

      #{$this}__row:hover & + #{$this}__cell-inner,
      #{$this}__row:focus & + #{$this}__cell-inner {
        display: none;
      }
    }
  }
</style>
