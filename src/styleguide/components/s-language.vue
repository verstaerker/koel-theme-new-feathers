<template>
  <label>
    <span class="invisible">Language</span>
    <select :class="b()" :value="language" @change="onChange">
      <option v-for="locale in i18nLocales"
              v-t="`s-language.${locale}`"
              :key="locale"
              :value="locale">
      </option>
    </select>
  </label>
</template>

<script>
  import i18nMixin from '../../mixins/i18n';

  export default {
    name: 's-language',
    // status: 1,

    mixins: [i18nMixin],

    // props: {},

    // data() {},

    // components: {},
    computed: {
      language() {
        return this.$i18n.locale;
      },
    },
    methods: {
      onChange(event) {
        this.i18nSetLocale(event.target.value);
      },
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
  };
</script>

<style lang="scss">
  // .s-language {}
</style>
