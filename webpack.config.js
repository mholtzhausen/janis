const HTMLWebpackPlugin = require('html-webpack-plugin')
const { join } = require('path')
const { VueLoaderPlugin } = require('vue-loader')
const { HotModuleReplacementPlugin } = require('webpack')

const config = {
	mode: 'development',
	entry: join(__dirname, 'src/newApp.js'),
	output:{
		path: join(__dirname, 'dist'),
		filename: 'bundle.js',
	},
	devServer:{
		port: 8080,
		open: true,
		historyApiFallback: true
	},
	module:{
		rules:[
			{
				test: /\.js$/i,
				loader: 'babel-loader',
				options: {
					presets: ['@babel/preset-env'],
					plugins:[
						'@babel/plugin-proposal-class-properties'
					]
				}
			},
			{
				test: /\.vue$/i,
				loader: 'vue-loader'
			},
			{
				test: /\.css$/i,
				use: [
					'vue-style-loader',
					'css-loader'
				]
			},
			{
				test: /\.s[ac]ss$/i,
				use: [
					'vue-style-loader',
					'css-loader',
					'sass-loader'
				]
			},
			{
				test: /\.(png|jpe?g|gif)$/i,
				use: [
					'file-loader',
				]
			}
		]
	},
	plugins:[
		new HotModuleReplacementPlugin(),
		new VueLoaderPlugin(),
		new HTMLWebpackPlugin({
			showErrors: true,
			cache: true,
			title: 'Vue with Webpack Start Project',
			template: join(__dirname, 'src/index.html')
		})
	]
}

module.exports = config
