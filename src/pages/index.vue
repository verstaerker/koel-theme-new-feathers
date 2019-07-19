<!-- eslint-disable max-len -->
<template>
  <!-- TODO: remove vuetify -->
  <div :class="b()" data-app>
    <div v-if="!getToken" :class="b('login')">
      <div :class="b('login-inner')">
        <c-login />
      </div>
    </div>
    <l-default v-else>
      <router-view />
    </l-default>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';
  import cLogin from '@/components/c-login';

  export default {
    name: 'index',
    components: {
      cLogin,
    },
    computed: {
      ...mapGetters('session', [
        'getToken'
      ]),
    },
    methods: {
      ...mapActions('session', [
        'logout'
      ]),
    }
  };
</script>

<style lang="scss">
  /* stylelint-disable selector-class-pattern */
  .index {
    height: 100%;

    &__login {
      display: flex;
      height: 100%;
      align-items: center;
      justify-content: center;
    }

    &__login-inner {
      width: 25%;
      max-width: 300px;
    }

    &__warning {
      border: 1px solid $color-status--danger;
      background: rgba($color-status--danger--rgb, 0.5);
      text-align: center;
      padding: $spacing--10;
    }
  }
</style>
