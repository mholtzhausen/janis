const plugin = {
	install (Vue) {
		Vue.mixin({
			mounted () {
				this.autoGrow();
			},

			methods: {
				autoGrow () {
					let elements = document.querySelectorAll('textarea[autogrow]');

					if (!elements) {
						return;
					}

					elements.forEach(element => {
						element.addEventListener('keyup',function(){
							this.style.height = `${this.scrollHeight}px`
							this.style.overflowY='hidden'
						})
					})
				}
			}
		});
	}
}

module.exports = plugin
