const plugin = {
	install (Vue) {
		Vue.mixin({
			mounted () {
				this.disableAutoComplete();
			},

			methods: {
				disableAutoComplete () {
					let elements = document.querySelectorAll('input[type="text"][autocomplete="off"]');

					if (!elements) {
						return;
					}

					elements.forEach(element => {
						if(!element.hasAttribute('readonly')){
							element.setAttribute("readonly", "readonly")
							element.style.backgroundColor = "inherit"
							element.addEventListener('focus',()=>{
								element.removeAttribute('readonly')
							})
						}
					})
				}
			}
		});
	}
}

module.exports = plugin
