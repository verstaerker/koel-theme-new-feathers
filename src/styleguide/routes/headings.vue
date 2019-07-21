<template>
  <div :class="b()">
    <div :class="b('example-container')">
      <h1>Headings</h1>
      <div :class="b('example-box')">
        <e-heading
          tag="h1">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
        </e-heading>
        <e-heading
          tag="h2">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
        </e-heading>
        <e-heading
          tag="h3">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
        </e-heading>
        <e-heading
          tag="h4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
        </e-heading>
        <e-heading
          tag="h5">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
        </e-heading>
        <e-heading
          tag="h6">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
        </e-heading>
      </div>

      <h1>Headings with links</h1>
      <div :class="b('example-box')">
        <e-heading
          tag="h1"
        >
          <a href="#">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          </a>
        </e-heading>
        <e-heading
          tag="h2"
        >
          <a href="#">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          </a>
        </e-heading>
        <e-heading
          tag="h3"
        >
          <a href="#">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          </a>
        </e-heading>
        <e-heading
          tag="h4"
        >
          <a href="#">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          </a>
        </e-heading>
        <e-heading
          tag="h5"
        >
          <a href="#">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          </a>
        </e-heading>
        <e-heading
          tag="h6"
          font-weight="bold"
        >
          <a href="#">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          </a>
        </e-heading>
      </div>
    </div>
  </div>
</template>

<script>
  import eHeading from '@/components/e-heading';

  export default {
    name: 'headings',

    components: {
      eHeading
    },

    // components: {},
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
  .headings {
    &__example-container {
      margin: $spacing--30;
    }

    &__example-box {
      margin: $spacing--30 $spacing--0;
    }
  }
</style>
