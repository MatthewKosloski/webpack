var webpack = require('webpack');
var path = require('path');

var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = function(env) {
	return {
		devtool: env.dev ? 'cheap-module-eval-source-map' : 'source-map',
		entry: './src/js/app.js',
	  	output: {
	    	filename: env.dev ? 'js/bundle.js' : 'js/bundle.min.js',
	    	path: path.resolve(__dirname, 'public')
	  	},
	  	module: {
	  		rules: [
	  			{
	  				test: /\.css$/, 
	  				use: ExtractTextPlugin.extract({
	                	use: 'css-loader'
	            	})
	  			}
	  		]
	  	},
	  	plugins: [
			new webpack.optimize.UglifyJsPlugin({disable: env.dev}),
			new OptimizeCssAssetsPlugin({disable: env.dev}),
			new ExtractTextPlugin(env.dev ? 'css/style.css' : 'css/style.min.css'),
			new HtmlWebpackPlugin({
				template: './src/index.html',
				minify: {
					collapseWhitespace: !env.dev
				}
			})
		],
		devServer: {
			quiet: true,
			port: 9000
		},
	}
};