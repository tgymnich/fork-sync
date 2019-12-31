module.exports = retryPlugin

const wrapRequest = require('./wrap-request')
const errorRequest = require('./error-request')

function retryPlugin (octokit, octokitOptions = {}) {
  const state = Object.assign({
    enabled: true,
    retryAfterBaseValue: 1000,
    doNotRetry: [ 400, 401, 403, 404, 422 ],
    retries: 3
  }, octokitOptions.retry)

  octokit.retry = {
    retryRequest: (error, retries, retryAfter) => {
      error.request.request.retries = retries
      error.request.request.retryAfter = retryAfter
      return error
    }
  }

  if (!state.enabled) {
    return
  }

  octokit.hook.error('request', errorRequest.bind(null, octokit, state))
  octokit.hook.wrap('request', wrapRequest.bind(null, state))
}
