const axios = {}; // TODO: remove helper

/**
 * Pushes an array of messages to the notification handler.
 *
 * @param {Array} messages - An array of messages.
 * @param {Object} options - Display options for the notifications.
 */
function showNotifications(messages, options) {
  if (!Array.isArray(messages)) {
    return;
  }

  messages.forEach((message) => {
    window.vm.$store.commit('notification/pushNotification', {
      ...options,
      message,
    });
  });
}

/**
 * Handles successful ajax requests.
 *
 * @param {Object} response - Response object.
 * @param {Object} options - Display options for notification.
 *
 * @returns {Object}
 */
function handleSuccess(response, options) {
  if (response && response.data && response.data.messages) {
    showNotifications(response.data.messages, options);
  }

  return response || {};
}

/**
 * Handles axios error responses.
 *
 * @param {Object} error - An axios error object.
 * @param {Object} error.response - The response data.
 * @param {Object} options - Additional request options.
 *
 * @returns {Promise<never>}
 */
function handleError(error, options) {
  if (error && error.response && error.response.data && error.response.data.messages) {
    showNotifications(error.response.data.messages, options);
  } else {
    window.vm.$store.dispatch('notification/showUnknownError');
  }

  return Promise.reject(error);
}

export default {
  /**
   * Runs a get request with given url with given url params.
   *
   * @param {String} url - Url to get.
   * @param {Object} params - Url parameters which will be attached to the url.
   * @param {Object} notificationOptions - Display options for notification.
   *
   * @returns {Promise} Promise with response data or error.
   */
  get(url, params, notificationOptions) {
    return axios
      .get(url, params)
      .then(response => handleSuccess(response, notificationOptions))
      .catch(error => handleError(error, notificationOptions));
  },

  /**
   * Runs a post request with a given url and payload.
   *
   * @param {String} url - Url to post to.
   * @param {Object} payload - Post payload which will be attached to the request.
   * @param {Object} notificationOptions - Display options for notification.
   *
   * @returns {Promise} Promise with response data or error.
   */
  post(url, payload, notificationOptions) {
    return axios
      .post(url, payload)
      .then(response => handleSuccess(response, notificationOptions))
      .catch(error => handleError(error, notificationOptions));
  },

  /**
   * Runs a patch request with a given url and payload.
   *
   * @param {String} url - Url to patch to.
   * @param {Object} payload - Patch payload which will be attached to the request.
   * @param {Object} notificationOptions - Display options for notification.
   *
   * @returns {Promise} Promise with response data or error.
   */
  patch(url, payload, notificationOptions) {
    return axios
      .patch(url, payload)
      .then(response => handleSuccess(response, notificationOptions))
      .catch(error => handleError(error, notificationOptions));
  },

  /**
   * Runs a delete request with a given url and payload.
   *
   * @param {String} url - Url to send the delete to.
   * @param {Object} params - Url parameters which will be attached to the url.
   * @param {Object} notificationOptions - Display options for notification.
   *
   * @returns {Promise} Promise with response data or error.
   */
  delete(url, params, notificationOptions) {
    return axios
      .delete(url, params)
      .then(response => handleSuccess(response, notificationOptions))
      .catch(error => handleError(error, notificationOptions));
  },
};
