function applyStyle(style,el){
	el.style=`${style};${el.style.cssText}`
}

const plugin = {
	install (Vue) {
		Vue.mixin({
			mounted (e) {
				if(this.$props.xStyle) applyStyle(this.$props.xStyle, this.$el);
			},
			updated (e){
				if(this.$props.xStyle) applyStyle(this.$props.xStyle, this.$el);
			},

			props: {
				xStyle: {
					type: String,
				}
			}
		});
	}
}

module.exports = plugin
