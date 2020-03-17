
const storageProxy = (key, defaults) => {
	let data = JSON.parse(localStorage.getItem(key)) || defaults || {}
	return new Proxy(data, {
		get (target, prop) {
			return prop in target ? target[prop] : undefined
		},

		set (target, prop, value) {
			console.log({ target, prop, value })
			if ((prop in target) && target[prop] === value) return true

			target[prop] = value
			localStorage.setItem(key, JSON.stringify({ ...target }))
			return true
		},
		has (target, prop) {
			return prop in target
		},
		deleteProperty (target, prop) {
			if (prop in target) {
				delete (target[prop])
				localStorage.setItem(key, JSON.stringify({ ...target }))
			}
		}
	})
}


class VueStoragePluginError extends Error { }

const plugin = {
	install (Vue, options) {
		options = Object.assign({}, {
			storageName: null,
			serviceName: '$store'
		}, options || {})

		if (!options.storageName) throw new VueStoragePluginError('Plugin requires `option.storageName` to be set')

		Vue.prototype[options.serviceName] = Vue.observable(storageProxy(`_VuStPr_${options.storageName}`))
		window.$$$=Vue.prototype[options.serviceName]
	}
}

export default plugin
