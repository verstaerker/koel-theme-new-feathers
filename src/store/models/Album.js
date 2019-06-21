import { Model } from '@vuex-orm/core';
import Song from './Song'; // eslint-disable-line import/no-cycle

/**
 * Model definition for a music album.
 */
export default class Album extends Model {
  static entity = 'album';

  /**
   * The fields of this Model.
   *
   * @returns {Object}
   */
  static fields() {
    return {
      id: this.attr(null),
      cover: this.string(null),
      name: this.string(null),
      songs: this.hasMany(Song, 'album_id'),
    };
  }
}
