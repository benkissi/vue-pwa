import axios from '../utils/axiosUtil'
import type { TMutateMethods, IApiCache } from '@/interfaces'

const apiCache: IApiCache = {}

/**
 * Returns a status message based on the input status code.
 *
 * @param {number} status - The status code to generate a message for.
 * @return {string} The status message associated with the given status code.
 */
const getStatusMessage = (status: number) => {
  switch (status) {
    case 401:
      return 'You are not authorized to access this resource'
    case 500:
      return 'Server could not process operation'

    default:
      return 'Operation failed'
  }
}

/**
 * A hook function that returns an object with functions to perform HTTP requests with axios, fetch data from a given URL with optional caching, and invalidate a specific cache entry.
 *
 * @return {Object} an object containing the following functions:
 *   - fetchData: a function to fetch data from a given URL with optional caching
 *   - mutate: a function to perform a HTTP request with axios
 *   - invalidate: a function to invalidate a specific cache entry
 */
export function useApi() {
  /**
   * A function to perform a HTTP request with axios.
   *
   * @param {string} method - HTTP method type (e.g. 'get', 'post', 'put', 'delete')
   * @param {string} url - URL for the HTTP request
   * @param {Object} payload - data to be sent as the request body
   * @param {Object} options - additional options for the axios request
   * @return {Object} an object with a success boolean and either data or an error message
   */
  const mutate = async (
    method: TMutateMethods = 'post',
    url = '',
    payload = {},
    options = {}
  ) => {
    try {
      const res = await axios[method](url, payload, options)
      console.log('res-----', res)
      return {
        success: true,
        data: res.data
      }
    } catch (error: any) {
      console.log('error-----', error)

      const errorMsg =
        error.response?.data?.message ||
        error.response?.data?.msg ||
        error.message

      //check if offline and return the right error
      if (!navigator.onLine) {
        return {
          success: false,
          error: 'You are offline',
          offline: true
        }
      }

      return {
        success: false,
        error: errorMsg
      }
    }
  }

  /**
   * Fetches data from a given URL using Axios with optional caching.
   *
   * @param {string} url - The URL to fetch data from.
   * @param {boolean} [invalidate=false] - Whether to invalidate the cache for this URL.
   * @param {Object} [options={}] - Optional Axios request options.
   * @return {Object} An object containing success status and either the fetched data or error message.
   */
  const fetchData = async (url: string, invalidate = false, options = {}) => {
    try {
      if (!invalidate && apiCache[url]) {
        const res = apiCache[url]
        return {
          success: true,
          data: res.data
        }
      }
      const res = await axios.get(url, options)

      if (res.status !== 200 && res.status !== 201) {
        {
          throw new Error(getStatusMessage(res.status))
        }
      }
      apiCache[url] = res
      return {
        success: true,
        data: res.data
      }
    } catch (error: any) {
      const errorMsg =
        error?.response?.data?.message ||
        error?.response?.data?.msg ||
        error?.message

      return {
        success: false,
        error: errorMsg
      }
    }
  }

  const invalidate = (key = '') => {
    if (key === '*') {
      Object.keys(apiCache).forEach((cacheKey) => {
        delete apiCache[cacheKey]
      })
    } else if (key.endsWith('*')) {
      const prefix = key.slice(0, -1)
      Object.keys(apiCache).forEach((cacheKey) => {
        if (cacheKey.startsWith(prefix)) {
          delete apiCache[cacheKey]
        }
      })
    } else {
      delete apiCache[key]
    }
  }

  return {
    fetchData,
    mutate,
    invalidate
  }
}
