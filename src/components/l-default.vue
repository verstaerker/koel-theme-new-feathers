<template>
  <div :class="b()">
    <div :class="b('inner')">
      <nav :class="b('nav')">
        <c-navigation :items="navigation" :minimized="$route.fullPath !== '/'" />
      </nav>
      <main v-if="$route.fullPath !== '/'" :class="b('content')">
        <c-notification-container />
        <slot></slot>
      </main>
    </div>
    <footer :class="b('footer')">
      <c-player />
    </footer>
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
    height: 100%;

    &__inner {
      display: flex;
      flex-direction: row;
      justify-content: center;
      height: 100%;
      overflow-x: hidden;
      padding: $spacing--40 0;
    }

    &__content {
      width: 100%;
    }

    &__nav {
      display: flex;
      align-items: center;
      padding: $spacing--10;
    }

    &__footer {
      position: fixed;
      right: 0;
      bottom: 0;
      left: 0;
      background-color: $color-grayscale--100;
    }
  }
</style>
