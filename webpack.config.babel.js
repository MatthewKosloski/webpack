import webpack from 'webpack';
import path from 'path';

import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import ImageminPlugin from 'imagemin-webpack-plugin';
import BrowserSyncPlugin from 'browser-sync-webpack-plugin';

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
  				use: ExtractTextPlugin.extract({use: [{loader: 'css-loader'}, {loader: 'postcss-loader'}, {loader: 'sass-loader'}]})
  			},
  			{
  				test: /\.js$/,
  				exclude: /node_modules/,
  				use: {loader: 'babel-loader'}
  			},
  			{
  				test: /\.(png|jpg|jpeg|gif|svg)$/,
  				use: {loader: 'file-loader?publicPath=../&name=assets/img/[name].[ext]'}
  			},
  			{
  				test: /\.(eot|svg|ttf|woff|woff2)$/,
  				use: {loader: 'file-loader?publicPath=../&name=assets/fonts/[name].[ext]'}
  			},
	  	]
  	},
  	plugins: [
		new webpack.optimize.UglifyJsPlugin({disable: env.dev}),
		new ExtractTextPlugin(`css/[name]${env.production ? '.min' : ''}.css`),
		new OptimizeCssAssetsPlugin({disable: env.dev}),
		new HtmlWebpackPlugin({template: './src/index.html', minify: {collapseWhitespace: env.production}}),
		new ImageminPlugin({ test: 'assets/**' }),
		new BrowserSyncPlugin(
			{
				host: 'localhost',
				port: 3000,
				proxy: 'http://localhost:8080/',
				open: false,
				ui: false
			},
			{
				reload: false
			}
		)
	],
	devServer: {
		quiet: true
	},
	resolve: {
		alias: {
			normalize: path.join(__dirname, 'node_modules/normalize.css/normalize.css'),
			typi: path.join(__dirname, 'node_modules/typi/scss/_typi.scss')	
		}
	}
});

export default config;