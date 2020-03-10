// const db = require('./db')
const ls = require('../lib/localStore')



class DbAPI {

	constructor() {
	}

	getDatabases () {
		return ls.get('databases') || {}
	}

	setDavDb (name, config) {
		let dbs = this.getDatabases()
		config = Object.assign({
			type: 'webDav',
			url: '',
			user: '',
			password: ''
		}, config || {})
		
		dbs[name]=config
		ls.set('databases',dbs)
	}

}


module.exports = new DbAPI()
