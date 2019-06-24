<template>
  <div :class="b()">
    <e-button v-if="getCurrentSong" @click="onPlayClick">
      Play
    </e-button>
    <audio ref="audio"
           :src="src"
           preload
           @ended="onEnded"
           @pause="onPause"
           @play="onPlay"
    ></audio>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex';

  export default {
    name: 'c-player',
    // status: 1,

    // components: {},
    // mixins: [],

    // props: {},
    data() {
      return {
        audio: null,
        isPlaying: false,
      };
    },

    computed: {
      ...mapGetters('player', [
        'getCurrentSong'
      ]),
      ...mapGetters('session', [
        'getToken'
      ]),
      src() {
        const song = this.getCurrentSong;

        if (!song) {
          return null;
        }

        return `//localhost:8888${this.$t('api.root') + this.$t('api.play', { songId: song.id })}?jwt-token=${this.getToken}`;
      }
    },
    watch: {
      src(value) { // TODO: not working yet
        if (value) {
          this.$refs.audio.play();
        }
      }
    },

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
      ...mapActions('player', [
        'getFile',
        'nextSong',
        'getPlaylist'
      ]),
      onEnded() {
        if (this.getPlaylist.length > 1) {
          this.nextSong();
        }
      },
      onPlayClick() {
        this.togglePlay();
      },
      onPause() {
        this.isPlaying = false;
      },
      onPlay() {
        this.isPlaying = true;
      },
      togglePlay() {
        if (this.isPlaying) {
          this.$refs.audio.pause();
        } else {
          this.$refs.audio.play();
        }
      }
    },
    // render() {},
  };
</script>

<style lang="scss">
  .c-player {
    // ...
  }
</style>
