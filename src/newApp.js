import Vue from 'vue'
import Main from './components/new/Main.vue'
import uxStatePlugin from './lib/plugins/uxStatePlugin'
import autocompleteOff from './lib/plugins/autocompleteOff'
import textareaAutoGrow from './lib/plugins/textareaAutoGrow'
import xStyle from './lib/plugins/xStyle'
import autoBlur from './lib/plugins/autoBlur'
import vuePouchConfig from './lib/plugins/vuePouchConfig'
import VueStorage from './lib/plugins/vueStorage.plugin'
import uxState from './uxState'
import { BootstrapVue, IconsPlugin } from "bootstrap-vue"
import PouchDB from 'pouchdb-browser'
import PouchVue from 'pouch-vue'
import PouchFind from 'pouchdb-find'
import PouchLiveFind from 'pouchdb-live-find'

PouchDB.plugin(PouchFind);
PouchDB.plugin(PouchLiveFind);


Vue.use(VueStorage, {
	storageName: 'config',
	serviceName: '$s'
})

Vue.use(PouchVue, {
	pouch: PouchDB,    // optional if `PouchDB` is available on the global object
	defaultDB: 'janis_db',  // this is used as a default connect/disconnect database
	optionDB: {}, // this is used to include a custom fetch() method (see TypeScript example)
})

Vue.use(vuePouchConfig,{pouch:PouchDB,default:{
	editorType:'code'
}})

import './styles/theme/default/dark.scss'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(textareaAutoGrow)
Vue.use(autocompleteOff)
Vue.use(autoBlur)
Vue.use(xStyle)
Vue.use(uxStatePlugin, {
	state: uxState,
	componentName: 'ux-state',
	service: '$',
	debug: true
})

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

import jIcon from './components/new/jIcon.vue'
Vue.component('j-icon', jIcon)



new Vue({
	render: h => h(Main)
}).$mount('#app')
