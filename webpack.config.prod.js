// jscs:disable
var path = require('path');
var webpack = require('webpack');
var AssetsPlugin = require('assets-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  devtool: false,
  entry:  {
    main: ['./src/client.js'],
    vendor: [
      'react',
      'react-dom',
      'react-router',
      'redux',
      'react-redux'
    ]
  },
  output: {
     path: __dirname + '/build/static',
     filename: '[name]_[hash].js',
     chunkFilename: '[id].chunk_[hash].js',
     publicPath: '/build/static/'
  },
  plugins: [
    //new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor_[hash].js',  2),
    new webpack.optimize.DedupePlugin(),
    new AssetsPlugin({filename: 'assets.json'}),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        unused: true,
        dead_code: true,
        warnings: false,
        screw_ie8: true,
      }
    }),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    new ExtractTextPlugin("styles.css", {
      allChunks: true
    }),
    new HtmlWebpackPlugin({
      favicon: 'src/static/favicon.ico'
    })
  ],
  resolve: {
    root: path.join(__dirname),
    extensions: [ '', '.js', '.css' ],
    modulesDirectories: ['node_modules']
  },
  resolveLoader: {
    root: path.join(__dirname, "node_modules")
  },
  module: {
    loaders: [
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract("style", "css!postcss!less")
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract("style", "css!postcss")
      },
      {
        test: /\.js?$/,
        loader: 'babel',
        include: path.join(__dirname, "src")
      },
      {
        test: /\.(woff|woff2)/,
        loader: 'url?prefix=font/&limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.(ttf|eot|svg)/,
        loader: 'file?prefix=font/'
      },
      {
        test: /\.(png|ico)$/,
        loader: "url?limit=100000",
        include: path.join(__dirname, 'src')
      },
      {
        test: /\.(jpeg|jpg|gif)$/i,
        loader: 'static',
        include: path.join(__dirname, 'src')
      }
    ]
  }
};
