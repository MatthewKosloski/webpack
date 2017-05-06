import webpack from 'webpack';
import path from 'path';

import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin';

const config = (env) => ({
	devtool: env.dev ? 'cheap-module-eval-source-map' : 'source-map',
	entry: {
		bundle: './src/js/app.js'
	},
  	output: {
    	filename: `js/[name]${env.production ? '.min' : ''}.js`,
    	path: path.join(__dirname, 'public')
  	},
  	module: {
  		rules: [
  			{
  				test: /\.html$/,
  				use: {loader: 'html-loader'}
  			},
  			{
  				test: /\.scss$/, 
  				use: ExtractTextPlugin.extract({use: [{loader: 'css-loader'}, {loader: 'sass-loader'}]})
  			},
  			{
  				test: /\.js$/,
  				exclude: /node_modules/,
  				use: {loader: 'babel-loader'}
  			},
  			{
  				test: /\.(png|jpg)$/,
  				use: {loader: 'file-loader?name=assets/img/[name].[ext]'}
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

export default config;