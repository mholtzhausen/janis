/**
 * Example Configuration for a state object
 */
const exampleStateConfig = {
	login: {
		value: '',
		default: 'captureEmail',
		states: [
			'captureEmail',
			'capturePassword',
			'register',
			'authenticating',
			'authenticated'
		],
		constraints: {
			'captureEmail': ['capturePassword', 'register'],
			'capturePassword': ['authenticating'],
			'register': ['registering', 'captureEmail'],
			'authenticating': ['authenticated'],
			'authenticated': ['captureEmail']
		},
		validate: {
			'captureEmail > capturePassword': ({ newValue }) => {
				//regex for email validation
				let r = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/

				return r.test(newValue)
			}
		},
		beforeTransition: {
			'true > false': (context) => {
				return true
			}
		},
		afterTransition: {
			'true > false': (context) => {
				return true
			}
		},
		on: {
			'true': (context) => {
				return true
			}
		},
		off: {
			'true': (context) => {
				return true
			}
		}
	}
}


const uxStatePlugin = {
	install (Vue, options) {
		options = Object.assign({
			componentName: 'ux-state',
			service: '$ux',
			debug: false,
			state: {


			}
		}, options || {})

		let state = options.state
		const debug = options.debug ? console.log.bind(console) : () => { }
		const init = () => {
			for (let stateName in options.state) {
				let state = options.state[stateName]
				state.value = undefined
				$.set(stateName, state.default || '')
			}
		}

		const $ = {}
		const service = new Proxy(Vue.observable(state), {
			set (target, p, value) {
				if (p === '$') return $
				return $.set(p, value)
			},
			get (target, p) {
				if (p === '$') return $
				if (!(p in target)) return
				return target[p].value
			}
		})

		$.set = function(prop, newValue) {
			let canSet = this.canSet(prop, newValue)
			if (!canSet.success) return false

			let target = state[prop]
			let oldValue = target.value
			let validate = target.validate || {}

			const transitionName = `${oldValue} > ${newValue}`
			const context = { state, options, target, oldValue, validate, prop, newValue, transitionName }

			if ('beforeTransition' in target) {
				if (
					typeof target.beforeTransition === 'object'
					&& transitionName in target.beforeTransition
					&& typeof target.beforeTransition[transitionName] === 'function'
				) {
					if (!target.beforeTransition[transitionName](context)) {
						return ret(false, `${transitionName} beforeTransition cancelled`)
					}
				}
			}

			if ('off' in target) {
				if (
					typeof target.on === 'object'
					&& oldValue in target.on
					&& typeof target.off[oldValue] === 'function'
				) {
					target.off[oldValue](context)
				}
			}

			Vue.set(target, 'value', newValue)

			if ('on' in target) {
				if (
					typeof target.on === 'object'
					&& newValue in target.on
					&& typeof target.on[newValue] === 'function'
				) {
					target.on[newValue](context)
				}
			}

			if ('afterTransition' in target) {
				if (
					typeof target.afterTransition === 'object'
					&& transitionName in target.afterTransition
					&& typeof target.afterTransition[transitionName] === 'function'
				) {
					target.afterTransition[transitionName](context)
				}
			}

			return transitionName
		}

		$.canSet = function(prop, newValue) {
			if (!(prop in state)) state[prop] = { value: '', validate: {}, beforeTransition: {}, afterTransition: {} }

			let target = state[prop]
			let oldValue = target.value
			let validate = target.validate || {}

			const ret = (success, reason) => ({ success, reason })

			const isValidState = 'states' in target ? target.states.indexOf(newValue) >= 0 : true
			if (!isValidState) return ret(false, `${newValue} not defined in target.states `)

			const transitionName = `${oldValue} > ${newValue}`
			const context = { $ux: service, state, options, target, oldValue, validate, prop, newValue, transitionName }


			if (transitionName in validate) {
				let transitionValidation = validate[transitionName]
				if (typeof transitionValidation === 'function') {
					let transitionValid = transitionValidation(context)
					if (!transitionValid) return ret(false, `${transitionName} transition failed validation`)
				}
			}


			if ('constraints' in target) {
				const c = target.constraints
				if (oldValue in c) {
					if (c[oldValue].indexOf(newValue) < 0) return ret(false, `${transitionName} transition failed with constraints`)
				}
			}

			return ret(true, transitionName)
		}


		if (options.debug) window[options.service] = service

		Vue.prototype[options.service] = service

		Vue.component(options.componentName, {
			render (h) {
				return this.show && h('div', this.$slots.default)
			},
			computed: {
				show () {
					if (!(this.$props.name in this[options.service])) return false
					return this[options.service][this.$props.name] === this.$props.value
				}
			},
			props: {
				name: {
					type: String,
					required: true
				},
				value: {
					type: [String, Number, Boolean, Array, Object, Function],
					required: true
				}
			}
		})

		init() // Initialize all states

	}
}

module.exports = uxStatePlugin
