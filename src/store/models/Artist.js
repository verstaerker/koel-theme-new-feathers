import { Model } from '@vuex-orm/core';
import Song from './Song'; // eslint-disable-line import/no-cycle

/**
 * Model definition for a song artist.
 */
export default class Artist extends Model {
  static entity = 'artist';

  /**
   * The fields of this Model.
   *
   * @returns {Object}
   */
  static fields() {
    return {
      id: this.attr(null),
      name: this.string(null),
      songs: this.hasMany(Song, 'artist_id'),
    };
  }
}
