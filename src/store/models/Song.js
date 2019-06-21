import { Model } from '@vuex-orm/core';
import Album from './Album'; // eslint-disable-line import/no-cycle
import Artist from './Artist'; // eslint-disable-line import/no-cycle

/**
 * Converts a second based value into a mm:ss String.
 *
 * @param  {Number} seconds - The runtime in seconds.
 *
 * @returns {String|null}
 */
function getRuntime(seconds) {
  let duration = parseInt(seconds, 10);

  if (Number.isNaN(duration)) {
    return null;
  }

  const minutes = Math.floor(duration / 60);

  duration -= minutes * 60;

  return `${minutes || '0'}:${duration < 10 ? `0${duration}` : duration}`;
}

/**
 * Model definition for a song.
 */
export default class Song extends Model {
  static entity = 'song';

  /**
   * The fields of this Model.
   *
   * @returns {Object}
   */
  static fields() {
    return {
      id: this.attr(null),
      album_id: this.number(null),
      artist_id: this.number(null),
      length: this.number(null),
      title: this.string(null),
      track: this.number(null),
      disc: this.number(null),
      album: this.belongsTo(Album, 'album_id'),
      artist: this.belongsTo(Artist, 'artist_id'),
    };
  }

  /**
   * The 'length' as MM:SS String.
   *
   * @returns {String}
   */
  get runtime() {
    return getRuntime(this.length);
  }
}
