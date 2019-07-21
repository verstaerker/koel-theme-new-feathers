<template>
  <nav :class="b(modifiers)">
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
          <div :class="b('link-icon')">
            <e-icon :icon="item.meta.icon"
                    :width="iconSize"
                    :height="iconSize"
            />
          </div>
          <div :class="b('link-label')">
            {{ item.meta.title }}
          </div>
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
      },
      minimized: {
        type: Boolean,
        default: false,
      }
    },
    // data() {
    //   return {};
    // },

    computed: {
      filteredItems() {
        return this.items.filter(item => !!item.meta && !(/\/:/).test(item.path));
      },
      modifiers() {
        return {
          minimized: this.minimized,
        };
      },
      iconSize() {
        return this.minimized ? 30 : 50;
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
    $this: &;

    color: $color-grayscale--1000;

    &__navigation {
      @extend %list-reset;

      display: flex;
      justify-content: space-around;

      @include media(md) {
        display: block;
      }
    }

    &__link {
      display: flex;
      align-items: center;
      padding: $spacing--20;
    }

    &__link-label {
      color: $color-grayscale--1000;
      margin-left: $spacing--20;
    }

    &--minimized {
      #{$this}__link-label {
        display: none;
      }
    }
  }
</style>
