import store from '@/store'; // eslint-disable-line import/no-cycle

/**
 * Sends a POST request to the given url.
 *
 * @param {String} url - The URL which should be used for the request.
 * @param {Object} payload - The to be sent data.
 * @param {Object} config - A fetch() configuration.
 *
 * @returns {Promise<any | never>}
 */
export default function post(url, payload, config) {
  const token = store.getters['session/getToken'];

  return fetch(`//localhost:8888${url}`, {
    ...config,
    // credentials: 'include', // Not working with CORS workaround
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(payload)
  })
    .then(response => response.json())
    .catch((error) => {
      switch (error.status) {
        case 401:
          // Falls through

        case undefined: // eslint-disable-line no-undefined
          // eslint-disable-next-line no-console
          console.error('POST failed.', error); // TODO: add visible error notification.

          store.dispatch('session/logout');

        // no default
      }
    });
}
