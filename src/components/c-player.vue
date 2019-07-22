<template>
  <div :class="b()">
    <div ref="progress" :class="b('progress-wrapper')" @click="onProgressClick">
      <div :class="b('progress')">
        <div :class="b('progress-indicator', { transition: !isSearching })" :style="{ width: progress }"></div>
      </div>
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
    <audio ref="current"
           :src="src"
           preload
           @ended="onEnded"
           @pause="onPause"
           @play="onPlay"
           @timeupdate="onTimeUpdate"
           @loadeddata="onLoadedData"
           @waiting="onWaiting"
    ></audio>
    <audio ref="next"
           :src="nextSrc"
           preload
    ></audio>
  </div>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex';

  export default {
    name: 'c-player',
    // status: 1,

    // components: {},
    // mixins: [],

    // props: {},
    data() {
      return {
        currentTime: 0,
        duration: 0,
        isLoading: false,
        preload: false,
        isSearching: false,
      };
    },

    computed: {
      ...mapGetters('player', [
        'getCurrentSong',
        'getPreviousSong',
        'getNextSong',
        'getIsPlaying',
        'getPlaylist',
        'hasMoreSongs',
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
      nextSrc() {
        const song = this.getNextSong;

        if (!this.preload || !song) {
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
      ...mapMutations('player', [
        'setIsPlaying',
        'nextSong',
      ]),
      onEnded() {
        if (this.hasMoreSongs) {
          this.nextSong();
        }
      },
      onPlayClick() {
        this.togglePlay();
      },
      onPause() {
        this.setIsPlaying(false);
      },
      onPlay() {
        this.setIsPlaying(true);
      },
      togglePlay(play = !this.getIsPlaying) {
        if (play) {
          this.$refs.current.play();
        } else {
          this.$refs.current.pause();
        }

        this.setIsPlaying(play);
      },
      onTimeUpdate() {
        this.currentTime = this.$refs.current.currentTime || 0;
      },
      onLoadedData() {
        this.duration = this.$refs.current.duration || 0;
        this.isLoading = false;
        this.preload = true;

        this.togglePlay(this.getIsPlaying);
      },
      onWaiting() {
        this.isLoading = true;
      },
      onProgressClick(event) {
        const { clientX } = event;
        const progressWidth = this.$refs.progress.offsetWidth;
        const progress = 100 / progressWidth * clientX;

        this.isSearching = true;

        this.$nextTick(() => {
          this.$refs.current.currentTime = this.duration / 100 * progress;

          setTimeout(() => {
            this.isSearching = false;
          }, 100);
        });
      }
    },
    // render() {},
  };
</script>

<style lang="scss">
  .c-player {
    &__progress-wrapper {
      padding: $spacing--10 0;
      cursor: pointer;
    }

    &__progress {
      background: $color-grayscale--200;
    }

    &__progress-indicator {
      position: relative;
      width: 0;
      height: 0;
      border-bottom: 3px solid $color-primary--1;
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

      &--transition {
        transition: width 1s;
      }
    }

    &__controls {
      display: flex;
      justify-content: center;
    }
  }
</style>
