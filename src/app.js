import Vue from 'vue'
import Main from './components/Main.vue'
import uxStatePlugin from './lib/plugins/uxStatePlugin'
import uxState from './uxState'


Vue.use(uxStatePlugin, {
	state: uxState,
	componentName: 'ux-state',
	service:'$',
	debug: true
})

new Vue({
	render: h => h(Main)
}).$mount('#app')
