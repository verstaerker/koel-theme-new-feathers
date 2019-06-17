<template>
  <form :class="b()" action="/" @submit.prevent="onSubmit">
    <e-label :class="b('email')"
             :name="$t('c-login.email')"
             :state="state"
             invisible
    >
      <e-input v-model="email"
               :name="$t('c-login.email')"
               :placeholder="$t('c-login.email')"
               :disabled="progress"
               :state="state"
               type="email"
               required
      />
    </e-label>
    <e-label :class="b('password')"
             :name="$t('c-login.password')"
             :state="state"
             invisible
    >
      <e-input v-model="password"
               :name="$t('c-login.password')"
               :placeholder="$t('c-login.password')"
               :disabled="progress"
               :state="state"
               type="password"
               required
      />
    </e-label>

    <e-button :class="b('submit')"
              :progress="progress"
              primary
    >
      <span v-t="'c-login.submit'"></span>
    </e-button>
  </form>
</template>

<script>
  import { mapActions } from 'vuex';

  export default {
    name: 'c-login',
    // status: 1,

    // components: {},
    // mixins: [],

    // props: {},
    data() {
      return {
        /**
         * @type {String} Holds the email value of the login form.
         */
        email: null,

        /**
         * @type {String} Holds the password value of the login form.
         */
        password: null,

        /**
         * @type {String} Holds the form state (error|null).
         */
        state: null,

        /**
         * @type {Boolean} Flag of the current request state.
         */
        progress: false,
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

    methods: {
      ...mapActions('session', [
        'login'
      ]),

      /**
       * Event handler for login form submit event.
       */
      onSubmit() {
        this.state = null;
        this.progress = true;

        this
          .login({ email: this.email, password: this.password })
          .then()
          .catch(() => {
            this.state = 'error';
          })
          .finally(() => {
            this.progress = false;
          });
      }
    },
    // render() {},
  };
</script>

<style lang="scss">
  .c-login {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: $spacing--20 0 $spacing--20 25vw;

    &__submit,
    &__email,
    &__password {
      flex: 1 1 auto;
    }

    &__password {
      margin: 0 $spacing--20;
    }

    @keyframes c-login--shake {
      10%,
      90% {
        transform: translate3d(-1px, 0, 0);
      }

      20%,
      80% {
        transform: translate3d(2px, 0, 0);
      }

      30%,
      50%,
      70% {
        transform: translate3d(-4px, 0, 0);
      }

      40%,
      60% {
        transform: translate3d(4px, 0, 0);
      }
    }
  }
</style>
