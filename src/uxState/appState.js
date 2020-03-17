const api = require('../api')
//context = { service, state, options, self, oldValue, validate, prop, newValue, transitionName }


const appState = {
	default: 'ready',
	states: [
		'editDatabase',
		'addDatabase',
		'ready',
	]
}

module.exports = appState
