const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const rootDir = __dirname;
const paths = {
  root: rootDir,
  dist: path.join(rootDir, 'dist'),
  config: path.join(rootDir, 'src', 'config'),
  node_modules: path.join(rootDir, 'node_modules'),
  src: path.join(rootDir, 'src'),
};

const env = process.env.CONFIG_ENV || 'local';
const config = require(`${paths.config}/${env}`);

console.log("Building Grapevine RSS Reader with config: ", JSON.stringify(config, null, ' '));

var publicPath = "http://localhost:8001";

module.exports = {
  mode: config.mode,
  entry: ['./src/index.tsx'],
  output: {
    filename: 'main.js',
    path: path.join(paths.root, '/dist'),
    publicPath: publicPath + '/'
  },
  devtool: 'inline-source-map',
  plugins: [
    new webpack.DefinePlugin({
      config: JSON.stringify(config),
    }),
    new CopyWebpackPlugin([
      {
        from: './index.html',
        to: paths.dist,
        toType: 'dir',
      },
    ]),
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'tslint-loader',
        exclude: /node_modules/,
        enforce: 'pre',
      },
      {
        test: /\.tsx?$/,
        loaders: [
          'ts-loader'
        ]
      },
      {
        test: /\.css$/,
        include: path.join(__dirname, 'src/styles'),
        use: [
          'style-loader',
          'css-loader',
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
    modules: [
      paths.src,
      paths.node_modules,
    ],
  },
  devServer: {
    contentBase: paths.dist,
    disableHostCheck: true
  },
};
