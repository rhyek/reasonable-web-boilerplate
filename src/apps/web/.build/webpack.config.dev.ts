import * as webpack from 'webpack'
import * as path from 'path'

const basePath = path.join(__dirname, '../')
const port = 8080

const config: webpack.Configuration = {
  entry: [
    'react-hot-loader/patch',
    basePath + 'main.tsx'
  ],
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    hot: true,
    port,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    overlay: true,
    clientLogLevel: 'none'
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  output: {
    filename: 'app.js',
    publicPath: `http://localhost:${port}/`
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loaders: [
          'react-hot-loader/webpack',
          `awesome-typescript-loader?configFileName=${basePath + 'tsconfig.json'}`
        ]
      }
    ]
  }
}

export default config
