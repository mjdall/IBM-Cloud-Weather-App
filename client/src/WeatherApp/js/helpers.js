const fetch = require('isomorphic-fetch')

module.exports = {
	GetAPIPromise(apiEndpoint, successCallback, failureCallback) {
		return fetch(apiEndpoint)
			.then(resp => {
				if (resp.status / 100 === 2) {
					return resp.json()
				}
			})
			.then(resp => {
				successCallback(resp)
			})
			.catch(() => {
				failureCallback()
			})
	}
}