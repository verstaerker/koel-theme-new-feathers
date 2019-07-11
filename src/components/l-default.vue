<template>
  <div :class="b()" data-app>
    <header :class="b('header')">
      <c-navigation :items="$router.options.routes" />
    </header>
    <div :class="b('content')">
      <div :class="b('inner')">
        <c-notification-container />
        <slot></slot>
      </div>
    </div>
    <footer :class="b('footer')">
      <c-player />
    </footer>
    <portal-target name="modal-container" multiple />
  </div>
</template>

<script>
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
    // data() {
    //   return {};
    // },

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
    background: $color-grayscale--100;

    &__content {
      overflow: auto;
    }
  }
</style>
