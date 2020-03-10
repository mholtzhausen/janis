const api = require('../api')
//context = { service, state, options, self, oldValue, validate, prop, newValue, transitionName }


const appState={
	default: 'initializing',
	states: [
		'initializing',
		'requiresConfig',
		'ready',
	],
	constraints: {
		'initializing': ['requiresConfig', 'ready'],
		'requiresConfig': ['initializing'],
		'ready': ['initializing'],
	},
	on:{
		'initializing':({ service })=>{
			let dbs=api.getDatabases()
			if(Object.keys(dbs).length == 0) {
				service.appState = 'requiresConfig'
			}else{
				// attach the webdav service
				service.appState = 'ready'
			}
		}
	}
}

module.exports=appState
