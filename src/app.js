import Vue from 'vue'
import Main from './components/Main.vue'
import uxStatePlugin from './lib/plugins/uxStatePlugin'
import autocompleteOff from './lib/plugins/autocompleteOff'
import textareaAutoGrow from './lib/plugins/textareaAutoGrow'
import autoBlur from './lib/plugins/autoBlur'
import uxState from './uxState'
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(textareaAutoGrow)
Vue.use(autocompleteOff)
Vue.use(autoBlur)
Vue.use(uxStatePlugin, {
	state: uxState,
	componentName: 'ux-state',
	service:'$',
	debug: true
})

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

new Vue({
	render: h => h(Main)
}).$mount('#app')
