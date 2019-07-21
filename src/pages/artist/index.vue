<template>
  <div :class="b()">
    <ul :class="b('artist-list')">
      <li v-for="artist in artists" :key="artist.$id">
        {{ artist.name }}
      </li>
    </ul>
    <transition name="route-slide">
      <div v-if="this.$route.params.albumId" :class="b('detail')">
        <router-view />
      </div>
    </transition>
  </div>
</template>

<script>
  import Artist from '@/store/models/Artist';

  export default {
    name: 'artists',
    // status: 1,

    // components: {},
    // mixins: [],

    // props: {},
    // data() {
    //   return {};
    // },

    computed: {
      artists() {
        return Artist.all();
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
  .artists {
    display: flex;
    flex-direction: row;

    &__album-list {
      flex: 1 1 percentage(1 / 3);
    }

    &__detail {
      flex: 1 1 percentage(2 / 3);
    }
  }
</style>
