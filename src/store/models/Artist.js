import { Model } from '@vuex-orm/core';

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
    };
  }
}
