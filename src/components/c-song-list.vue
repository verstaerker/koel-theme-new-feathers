<template>
  <table :class="b('')">
    <thead>
      <tr>
        <th v-for="column in tableColumns" :key="column.field">
          {{ column.header }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="song in songs" :key="song.$id">
        <td v-for="column in tableColumns" :key="column.field">
          {{ song[column.field] }}
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
        track: this.$t('c-song-list.colTrack'),
        runtime: this.$t('c-song-list.colRuntime'),
        title: this.$t('c-song-list.colTitle'),
        albumName: this.$t('c-song-list.colTrack'),
        artistName: this.$t('c-song-list.colArtist'),
        disc: this.$t('c-song-list.colDisc'),
      };

      return {
        /**
         * An Array of columns which should be shown on the table.
         */
        tableColumns: this.$props.columns.reduce((tableColumns, column) => {
          tableColumns.push({ field: column, header: columns[column] });

          return tableColumns;
        }, []),
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
  }
</style>
