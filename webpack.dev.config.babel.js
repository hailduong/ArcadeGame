const path = require('path');
const webpack = require('webpack');


module.exports = {
	entry: {
		App: ['./src/App.js']
	},
	devtool: 'source-map',
	watch: true,
	watchOptions: {
		ignored: /node_modules/
	},
	output: {
		path: path.resolve(__dirname, './js'),
		filename: '[name].js',
		library: '[name]',
		libraryTarget: 'window',
		libraryExport: "default",
		chunkFilename: '[name].js'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['env'],
						plugins: [
							"transform-class-properties",
							'babel-plugin-syntax-dynamic-import'
						]
					}
				}
			}]
	}
};
