import { Model } from '@vuex-orm/core';

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
    };
  }
}
