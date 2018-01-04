import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import WebpackMd5Hash from 'webpack-md5-hash';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const extractSass = new ExtractTextPlugin({
  filename: "[name].[contenthash].css",
  disable: process.env.NODE_ENV === "development"
});

export default {
  devServer: {
    debug: true,
    devtool: 'source-map&&extract-text-webpack-plugin?sourceMap',
    noInfo: false
  },
  entry: {
    vendor: path.resolve(__dirname, 'src/vendor'),
    main: path.resolve(__dirname, 'src/index')
  },
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].[chunkhash].js'
  },
  resolve: {
      modules: [ 'node_modules', './src' ],
      alias: {vue$: 'vue/dist/vue.esm.js'}
  },
  externals: {
    "vue": "Vue",
    "createjs": "createjs"
  },
  plugins: [
    extractSass,
    // Generate an external css file with a hash in the filename.
    new ExtractTextPlugin({
      filename: '[name].[contenthash].css',
      disable: false,
      allChunks: true
    }),
    // Hash the files using MD5 so that their names change
    // when the content changes.
    new WebpackMd5Hash(),
    new webpack.SourceMapDevToolPlugin({
      filename: '[name].[chunkhash].js.map'
    }),
    // Use CommonsChunkPlugin to build a separate bundle
    // of vendor libraries so they are cached separately.
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    }),
    // Build a HTML file that includes a reference to bundled JS.
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true
      },
      inject: true
    }),
    // Minify JS.
    new webpack.optimize.UglifyJsPlugin({
      sourceMapFilename: '[name].[chunkhash].js.map',
      sourceMap: true,
      mangle: false
    })
  ],
  module: {
    rules: [
      {test: /\.js$/, exclude: /node_modules/, loaders: ['babel-loader']},
      {
        test: /\.scss$/,
        use: extractSass.extract({
            use: [{
                loader: "css-loader"
            }, {
                loader: "sass-loader"
            }],
            // use style-loader in development
            fallback: "style-loader"
        })
          }
    ]
  },
  watch: true
}