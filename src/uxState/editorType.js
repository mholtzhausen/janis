const api = require('../api')
//context = { service, state, options, self, oldValue, validate, prop, newValue, transitionName }


const editorType={
	default: 'both',
	states: [
		'code',
		'preview',
		'both',
	]
}

module.exports=editorType
