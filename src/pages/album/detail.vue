<template>
  <div :class="b()">
    <c-table :items="songs"
             :headers="headers"
             :pagination="pagination"
    >
      <template slot-scope="slotData">
        <td v-for="header in slotData.headers" :key="header.value">
          {{ slotData.props.item[header.value] }}
        </td>
      </template>
    </c-table>
  </div>
</template>

<script>
  import Album from '@/store/models/Album';
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
          { text: this.$t('album.detail.colTitle'), value: 'title' },
          { text: this.$t('album.detail.colDisc'), value: 'disc' },
          { text: this.$t('album.detail.colTrack'), value: 'track' },
          { text: this.$t('album.detail.colRuntime'), value: 'runtime' },
        ],
        pagination: {
          sortBy: 'track'
        }
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

    // methods: {},
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
