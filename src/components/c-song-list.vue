<template>
  <table :class="b()">
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
      <tr v-for="song in songs" :key="song.$id">
        <td
          v-for="column in tableColumns"
          :key="column.field"
          :class="b('cell')"
        >
          <span :class="b('cell-inner')" :title="song[column.field]">{{ song[column.field] }}</span>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
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
      };
    },

    computed: {
      /**
       * Returns an Array of all or filtered songs.
       *
       * @returns {Array.<Object>}
       */
      songs() {
        const { sortBy } = this;
        let songs = this.$store.getters['entities/song/all']();

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

    // methods: {},
    // render() {},
  };
</script>

<style lang="scss">
  .c-song-list {
    width: 100%;
    table-layout: fixed;

    &__cell {
      position: relative;
      height: 1.6em;
    }

    &__cell-inner { // Tables don't allow to hide text overflow.
      position: absolute;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      left: 0;
      right: $spacing--10;
    }
  }
</style>
