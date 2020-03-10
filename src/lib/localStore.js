const storage = {
	get (prop) {
		return JSON.parse(localStorage.getItem(prop))
	},
	set (prop, val) {
		localStorage.setItem(prop, JSON.stringify(val))
	},
	has (prop) {
		return localStorage.hasOwnProperty(prop)
	},
	remove (prop) {
		localStorage.removeItem(prop)
	},
	clear () {
		localStorage.clear()
	}
}


module.exports = storage
