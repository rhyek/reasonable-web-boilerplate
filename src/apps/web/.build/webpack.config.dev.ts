import * as webpack from 'webpack'
import * as path from 'path'

const basePath = path.join(__dirname, '..')
const port = 8080

const config: webpack.Configuration = {
  entry: [
    'react-hot-loader/patch',
    `${basePath}/main.tsx`
  ],
  output: {
    filename: 'app.js',
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
    clientLogLevel: 'warning'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'awesome-typescript-loader',
            options: {
              configFileName: `${basePath}/tsconfig.json`,
              // from https://developer.epages.com/blog/tech-stories/typescript-codesplitting-treeshaking/
              useBabel: true, 
              babelOptions: {
                babelrc: false,
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
                  // support dynamic import syntax, but leave it unchanged
                  'react-hot-loader/babel',
                  'babel-plugin-syntax-dynamic-import',
                  '@babel/plugin-proposal-object-rest-spread'
                ]
              },
              babelCore: '@babel/core'
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
    new webpack.HotModuleReplacementPlugin()
  ]
}

export default config
