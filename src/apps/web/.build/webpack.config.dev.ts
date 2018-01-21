/* tslint:disable */
import * as webpack from 'webpack'
import * as path from 'path'
import * as ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'

const basePath = path.join(__dirname, '..')
const port = 8080

const config: webpack.Configuration = {
  entry: {
    app: `${basePath}/main.tsx`
  },
  output: {
    filename: '[name].js',
    chunkFilename: '[name].js',
    publicPath: `http://localhost:${port}/`
  },
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    hot: true,
    port,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    overlay: true,
    clientLogLevel: 'warning',
    noInfo: true
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  stats: 'minimal',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/react',
                [
                  '@babel/env',
                  {
                    // leave imports as they are
                    modules: false,
                    targets: {
                      browsers: [
                        // choose browsers you want to support
                        'last 2 chrome versions'
                      ]
                    }
                  }
                ]
              ],
              plugins: [
                require('react-hot-loader/babel'),
                // support dynamic import syntax, but leave it unchanged
                require('babel-plugin-syntax-dynamic-import'),
                require('@babel/plugin-proposal-object-rest-spread')
              ]
            }
          },
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true
            }
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192, // 8 kb,
              // file-loader options
              context: basePath, // will output to /assets/images/*
              name: '[path][name].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.js',
      minChunks: module => {
        const context = module.context as string
        return context && context.includes('node_modules')
      }
    }),
    new ForkTsCheckerWebpackPlugin({
      tsconfig: path.resolve(__dirname, '../tsconfig.json'),
      tslint: true
    })
  ]
}

export default config
