<template>
  <div :class="b()">
    <c-song-list
      :columns="columns"
      :sort-by="'title'"
    />
  </div>
</template>

<script>
  import CSongList from '@/components/c-song-list';

  export default {
    name: 'song',
    components: { CSongList },
    // components: {},
    // status: 1,

    // components: {},
    // mixins: [],

    // props: {},
    data() {
      return {
        columns: ['title', 'runtime', 'artistName', 'albumName'],
        selectedSongs: null,
      };
    },

    // computed: {},
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
  .song {
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
