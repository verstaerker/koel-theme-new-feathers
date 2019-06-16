<!-- eslint-disable max-len -->
<template>
  <div :class="b()">
    <c-login v-if="!getToken" />
    <e-button v-else
              @click="logout"
    >
      Logout
    </e-button>
  </div>
</template>

<script>
  import cLogin from '@/components/c-login';
  import { mapGetters, mapActions } from 'vuex';

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
    max-width: map-get($breakpoints, xl);
    margin: 0 auto;
    padding: $spacing--30;

    &__warning {
      border: 1px solid $color-status--danger;
      background: rgba($color-status--danger--rgb, 0.5);
      text-align: center;
      padding: $spacing--10;
    }

    &__code {
      display: inline-block;
      border: 1px solid $color-grayscale--400;
      background: rgba($color-primary--2--rgb, 0.5);
      color: $color-primary--3;
    }
  }
</style>
