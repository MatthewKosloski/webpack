const webpack = require('webpack');
const path = require('path');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = (env) => ({
	devtool: env.dev ? 'cheap-module-eval-source-map' : 'source-map',
	entry: {
		bundle: './src/js/app.js'
	},
  	output: {
    	filename: `js/[name]${env.production ? '.min' : ''}.js`,
    	path: path.resolve(__dirname, 'public')
  	},
  	module: {
  		rules: [
  			{
  				test: /\.scss$/, 
  				use: ExtractTextPlugin.extract({use: [{loader: 'css-loader'}, {loader: 'sass-loader'}]})
  			},
  			{
  				test: /\.js$/,
  				exclude: /node_modules/,
  				use: {loader: 'babel-loader'}
  			}
  		]
  	},
  	plugins: [
		new webpack.optimize.UglifyJsPlugin({disable: env.dev}),
		new ExtractTextPlugin(`css/[name]${env.production ? '.min' : ''}.css`),
		new OptimizeCssAssetsPlugin({disable: env.dev}),
		new HtmlWebpackPlugin({template: './src/index.html', minify: {collapseWhitespace: env.production}})
	],
	devServer: {
		quiet: true,
		port: 9000
	},
});