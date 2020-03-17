const arr2Obj=(arr)=>{
	let obj={}
	arr.forEach(item=>{
		obj[item]=item
	})
	return obj
}

module.exports = {
	icon: {
		names: require('./icon_names.js'),
		sizes: require('./icon_sizes.js')
	}
}
