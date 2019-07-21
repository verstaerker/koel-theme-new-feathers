<template>
  <div :class="b()">
    <header :class="b('header')">
      <div :class="b('player')">
        <c-player />
      </div>
      <nav :class="b('nav')">
        <c-navigation :items="navigation" :minimized="$route.fullPath !== '/'" />
      </nav>
    </header>
    <main v-if="$route.fullPath !== '/'" :class="b('content')">
      <c-notification-container />
      <slot></slot>
    </main>
    <portal-target name="modal-container" multiple />
  </div>
</template>

<script>
  import { navigation } from '@/setup/routes';
  import cNotificationContainer from '@/components/c-notification-container';
  import cNavigation from '@/components/c-navigation';
  import cPlayer from '@/components/c-player';

  export default {
    name: 'l-default',
    // status: 1,

    components: {
      cNavigation,
      cNotificationContainer,
      cPlayer,
    },
    // mixins: [],

    // props: {},
    data() {
      return {
        navigation: Object.values(navigation)
      };
    },

    // computed: {},
    // watch: {},

    // beforeCreate() {},
    // created() {},
    // beforeMount() {},
    mounted() {
      this.getNotificationsFromStorage();
    },
    // beforeUpdate() {},
    // updated() {},
    // activated() {},
    // deactivated() {},
    // beforeDestroy() {},
    // destroyed() {},

    methods: {
      /**
       * Gets localStorage messages and pushes them in the notification store to display.
       */
      getNotificationsFromStorage() {
        const messages = window.localStorage.getItem('notifications');
        const messagesParsed = messages && JSON.parse(messages) ? JSON.parse(messages) : [];

        if (messages && Array.isArray(messagesParsed)) {
          messagesParsed.forEach((message) => {
            this.pushNotification({ message });
          });

          // Clears the localStorage notifications.
          window.localStorage.removeItem('notifications');
        }
      },
    },
    // render() {},
  };
</script>

<style lang="scss">
  .l-default {
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow-x: hidden;
    padding: 0 0 $spacing--50;

    @include media(md) {
      flex-direction: row;
      justify-content: center;
    }

    &__header {
      order: 1;
      margin-top: auto;

      @include media(md) {
        margin-top: 0;
        display: flex;
        order: initial;
      }
    }

    &__nav {
      @include media(md) {
        display: flex;
        align-items: center;
      }
    }

    &__content {
      width: 100%;
      overflow-y: auto;
      overflow-x: hidden;
      padding: $spacing--40 $spacing--20 0;

      @include media(md) {
        padding-bottom: $spacing--50; // Spacing player
      }
    }

    &__player {
      border-bottom: 1px solid $color-grayscale--200;
      padding-bottom: $spacing--10;

      @include media(md) {
        border: 0;
        position: fixed; // TODO: would be nicer it this could be done with flexbox or grid
        right: 0;
        bottom: 0;
        left: 0;
        background-color: $color-grayscale--100;
      }
    }
  }
</style>
