const plugin = {
	install (Vue, options) {
		
		options = Object.assign({
			service: '$conf',
			debug: false,
			pouch: false,
			dbname: 'config',
			default: {}
		}, options || {})
		
		let config = Object.assign({},options.default||{})
		
		if (!options.pouch) throw Error('expecting option pouch')
		options.dbname = `vpc_${options.dbname || 'config'}`

		

		// create the watched proxy
		let service = new Proxy(Vue.observable(config), {
			set (target, p, value) {
				target[p] = value
				console.log({rev:config._rev, config})
				db.put({...target,_rev:config._rev, _id:config._id}).then(()=>{
					updateService(doc)
					dbRefresh()
				})
				return true
			}
		})

		function updateService(doc){
			console.log({...config}.config)
			Object.assign(config,doc)
			console.log({...config}.config)
		}

		function dbRefresh(){
			return db.get(options.dbname).then(doc=>{
				udpateService(doc)
			})
		}

		function saveService(){
			db.put(config).then(()=>{
			})
		}


		window.conf=service
		Vue.prototype[options.service] = service


		const db = new options.pouch(options.dbname)
		db.get(options.dbname).then(doc => {
			updateService(doc)
			console.log('get',{config})
		}).catch(() => {
			db.put({ ...(options.default || {}), _id: options.dbname }).then(()=>{
				db.get(options.dbname).then(doc=>{
					updateService(doc)
				})
			})
		})


	}
}

module.exports = plugin
