<template>
  <nav :class="b()">
    <ul :class="b('navigation')">
      <router-link
        v-for="item in filteredItems"
        :key="item.name"
        :to="{ name: item.name }"
        :class="b('navigation-item')"
        :active-class="`${b('navigation-item')}--active-path`"
        :exact-active-class="`${b('navigation-item')}--active`"
        tag="li"
        exact>
        <a :class="b('link')">
          {{ item.meta.title }}
        </a>
      </router-link>
    </ul>
  </nav>
</template>

<script>
  export default {
    name: 'c-navigation',
    // status: 1,

    // components: {},
    // mixins: [],

    props: {
      items: {
        type: Array,
        required: true
      }
    },
    // data() {
    //   return {};
    // },

    computed: {
      filteredItems() {
        return this.items.filter(item => !!item.meta && !(/\/:/).test(item.path));
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
  .c-navigation {
    color: $color-grayscale--1000;

    &__navigation {
      @extend %list-reset;
    }
  }
</style>
