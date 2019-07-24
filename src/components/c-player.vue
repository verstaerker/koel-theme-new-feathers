<template>
  <div :class="b()">
    <div ref="progress" :class="b('progress-wrapper')" @click="onProgressClick">
      <div :class="b('progress')">
        <div :class="b('progress-indicator', { transition: !isSearching })" :style="{ width: progress }"></div>
      </div>
    </div>
    <div :class="b('main')">
      <div :class="b('controls', { left: true })">
        <img
          v-if="album"
          :class="b('album-cover')"
          :src="album.cover"
          alt="album.title"
        >
      </div>
      <div :class="b('controls', { center: true })">
        <e-circular-button
          :class="b('control', { previous: true })"
          :disabled="!getCurrentSong"
          :title="$t('c-player.previous')"
          :width="30"
          :height="30"
          icon="i-fast-backward"
          @click="previousSong"
        />
        <e-circular-button
          :class="b('control', { play: true })"
          :disabled="!getCurrentSong"
          :title="$t('c-player.play')"
          icon="i-play"
          @click="onPlayClick"
        />
        <e-circular-button
          :class="b('control', { next: true })"
          :disabled="!getCurrentSong"
          :title="$t('c-player.next')"
          :width="30"
          :height="30"
          icon="i-fast-forward"
          @click="nextSong"
        />
      </div>
      <div :class="b('controls', { right: true })">
        <button
          v-if="Array.isArray(getPlaylist) && getPlaylist.length"
          :class="b('playlist-toggle')"
          @click="onTogglePlaylist"
        >
          <e-icon icon="i-list" width="20" height="20" />
        </button>
      </div>
    </div>
    <div v-if="isPlaylistVisible" :class="b('playlist-wrapper')">
      <c-song-list :songs="getPlaylist" :show-header="false" />
    </div>
    <audio ref="previous"
           :src="previousSrc"
           preload
           @loadeddata="onLoadedData('previous')"
           @loadstart="onLoadStart('previous')"
    ></audio>
    <audio ref="current"
           :src="src"
           preload
           @ended="onEnded"
           @pause="onPause"
           @play="onPlay"
           @timeupdate="onTimeUpdate"
           @canplaythrough="onCanPlayThrough"
           @loadeddata="onLoadedData('current')"
           @loadstart="onLoadStart('current')"
    ></audio>
    <audio ref="next"
           :src="nextSrc"
           preload
           @loadeddata="onLoadedData('next')"
           @loadstart="onLoadStart('next')"
    ></audio>
  </div>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex';
  import Album from '@/store/models/Album';
  import ECircularButton from '@/components/e-circular-button';
  import CSongList from '@/components/c-song-list';

  export default {
    name: 'c-player',
    components: { CSongList, ECircularButton },
    // status: 1,

    // components: {},
    // mixins: [],

    // props: {},
    data() {
      return {
        currentTime: 0,
        duration: 0,
        isLoadingForCurrent: true,
        isLoadingForNext: true,
        isLoadingForPrevious: true,
        isSearching: false,
        isPlaylistVisible: false,
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
      album() {
        if (!this.getCurrentSong) {
          return null;
        }

        return Album.find(this.getCurrentSong.album_id);
      },
      nextSrc() {
        const song = this.getNextSong;

        if (this.isLoadingForCurrent || !song) {
          return '';
        }

        return `//localhost:8888${this.$t('api.root') + this.$t('api.play', { songId: song.id })}?jwt-token=${this.getToken}`;
      },
      previousSrc() {
        const song = this.getPreviousSong;

        if (this.isLoadingForCurrent || this.isLoadingForNext || !song) {
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
        'previousSong',
      ]),

      updateLoadingState(type, state) {
        switch (type) {
          case 'current':
            this.isLoadingForCurrent = state;
            break;

          case 'next':
            this.isLoadingForNext = state;
            break;

          case 'previous':
            this.isLoadingForPrevious = state;
            break;

          // no default
        }
      },

      /**
       * Callback for when the audio track finished playing.
       */
      onEnded() {
        if (this.hasMoreSongs) {
          this.nextSong();

          this.togglePlay(true);
        }

        this.updateLoadingState('current', true);
      },

      /**
       * Callback for when the audio track paused.
       */
      onPause() {
        this.setIsPlaying(false);
      },

      /**
       * Callback for when the audio track is playing.
       */
      onPlay() {
        this.setIsPlaying(true);
      },

      /**
       * Callback for when the currentTime of the audio track changes.
       */
      onTimeUpdate() {
        this.currentTime = (this.$refs.current && this.$refs.current.currentTime) || 0;
      },

      /**
       * Callback for when the audio track finished loading.
       */
      onCanPlayThrough() {
        this.duration = this.$refs.current.duration || 0;

        this.togglePlay(this.getIsPlaying);
      },
      onLoadedData(type) {
        this.updateLoadingState(type, false);
      },

      onLoadStart(type) {
        this.updateLoadingState(type, true);
      },

      /**
       * Callback for the play button.
       */
      onPlayClick() {
        this.togglePlay();
      },

      /**
       * Toggle play state.
       *
       * @param {Boolean} [play = !this.getIsPlaying] - A flag to force a certain play state.
       */
      togglePlay(play = !this.getIsPlaying) {
        if (play) {
          this.$refs.current.play();
        } else {
          this.$refs.current.pause();
        }

        this.setIsPlaying(play);
      },

      /**
       * Callback for progress bar clicks.
       *
       * @param {MouseEvent} event - The native mouse event.
       */
      onProgressClick(event) {
        const { clientX } = event;
        const progressWidth = this.$refs.progress.offsetWidth;
        const progress = 100 / progressWidth * clientX;

        this.isSearching = true;

        this.$nextTick(() => {
          this.$refs.current.currentTime = this.duration / 100 * progress;

          setTimeout(() => {
            this.isSearching = false;
          }, 201); // Needs to be higher than transition
        });
      },

      onTogglePlaylist() {
        this.isPlaylistVisible = !this.isPlaylistVisible;
      },
    },
    // render() {},
  };
</script>

<style lang="scss">
  .c-player {
    &__progress-wrapper {
      padding-bottom: $spacing--10;
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
        transition: width 200ms;
      }
    }

    &__main {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 $spacing--20;
    }

    &__controls {
      width: percentage(1 / 3);

      &--center {
        display: flex;
        justify-content: center;
        align-items: center;
      }

      &--right {
        display: flex;
        justify-content: flex-end;
      }
    }

    &__control--play {
      margin: 0 $spacing--25;
    }

    &__playlist-wrapper {
      padding: $spacing--20;
      max-height: 50vh;
      overflow: auto;
    }

    &__playlist-toggle {
      @extend %button-reset;
    }

    &__album-cover {
      max-width: 50px;
      height: auto;
    }
  }
</style>
