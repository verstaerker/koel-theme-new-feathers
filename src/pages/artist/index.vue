<template>
  <div :class="b()">
    <section :class="b('artist-list')">
      <c-artist-list />
    </section>
    <transition name="route-slide">
      <div
        v-if="$route.params.artistId"
        :class="b('detail')"
      >
        <router-view />
      </div>
    </transition>
  </div>
</template>

<script>
  import CArtistList from '@/components/c-artist-list';

  export default {
    name: 'artists',
    components: { CArtistList },
    // status: 1,

    // components: {},
    // mixins: [],

    // props: {},
    // data() {
    //   return {};
    // },

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
