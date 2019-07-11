<template>
  <div :class="b()">
    <div :class="b('progress-wrapper')">
      <div :class="b('progress')" :style="{ width: progress }"></div>
    </div>
    <div :class="b('controls')">
      <e-button :disabled="!getCurrentSong">
        Previous
      </e-button>
      <e-button :disabled="!getCurrentSong"
                :progress="isLoading"
                @click="onPlayClick"
      >
        Play
      </e-button>
      <e-button :disabled="!getCurrentSong">
        Next
      </e-button>
    </div>
    <audio ref="audio"
           :src="src"
           preload
           @ended="onEnded"
           @pause="onPause"
           @play="onPlay"
           @timeupdate="onTimeUpdate"
           @loadeddata="onLoadedData"
           @waiting="onWaiting"
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
        currentTime: 0,
        duration: 0,
        isLoading: false,
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
          return '';
        }

        return `//localhost:8888${this.$t('api.root') + this.$t('api.play', { songId: song.id })}?jwt-token=${this.getToken}`;
      },
      progress() {
        const progress = ((this.currentTime / this.duration) * 100).toFixed(1);

        return `${progress}%`;
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
      },
      onTimeUpdate() {
        this.currentTime = this.$refs.audio.currentTime || 0;
      },
      onLoadedData() {
        this.duration = this.$refs.audio.duration || 0;
        this.isLoading = false;
      },
      onWaiting() {
        this.isLoading = true;
      }
    },
    // render() {},
  };
</script>

<style lang="scss">
  .c-player {
    &__progress-wrapper {
      background: $color-grayscale--200;
      margin-bottom: $spacing--10;
    }

    &__progress {
      position: relative;
      width: 0;
      height: 0;
      border-bottom: 3px solid $color-primary--1;
      transition: width 1s;
      min-width: 5px;
      max-width: calc(100% - 5px);

      &::after {
        position: absolute;
        display: block;
        content: "";
        height: 10px;
        width: 10px;
        border-radius: 50%;
        background: $color-primary--1;
        top: calc(50% + 1px);
        right: 0;
        transform: translateY(-50%);
      }
    }

    &__controls {
      display: flex;
      justify-content: center;
    }
  }
</style>
