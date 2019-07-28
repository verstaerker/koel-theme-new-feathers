<!-- eslint-disable max-len -->
<template>
  <div :class="b()">
    <form @submit="onSubmit($event)">
      <e-input
        v-model="mediaPath"
        :class="b('field', { mediaPath: true })"
        name="media-path"
      />
      <e-button type="submit" primary>
        Speichern
      </e-button>
    </form>
  </div>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex';

  export default {
    name: 'settings',
    // components: {},
    computed: {
      ...mapGetters('session', [
        'getSettings',
      ]),

      mediaPath: {
        get() {
          return this.getSettings.mediaPath;
        },
        set(value) {
          this.setMediaPath(value);
        },
      }
    },
    methods: {
      ...mapMutations('session', [
        'setMediaPath',
      ]),

      onSubmit(event) {
        event.preventDefault();
      }
    }
  };
</script>

<style lang="scss">
  /* stylelint-disable selector-class-pattern */
  .settings {
    &__field {
      margin-bottom: $spacing--20;
    }
  }
</style>
