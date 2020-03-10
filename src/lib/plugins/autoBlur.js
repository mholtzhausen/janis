const plugin = {
	install (Vue) {
		Vue.mixin({
			mounted () {
				this.disableAutoComplete();
			},

			methods: {
				disableAutoComplete () {
					let elements = document.querySelectorAll('[autoblur]');

					if (!elements) {
						return;
					}

					elements.forEach(element => {
						element.addEventListener('focus',function(){
							this.blur()
						})
					})
				}
			}
		});
	}
}

module.exports = plugin
