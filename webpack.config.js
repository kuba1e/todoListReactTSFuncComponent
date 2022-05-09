const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const Dotenv = require('dotenv-webpack')

module.exports = (env = {}) => {
  const mode = env.production ? 'production' : 'development'

  const getStyleLoaders = () => {
    return [
      mode === 'production'
        ? {
            loader: MiniCssExtractPlugin.loader
          }
        : { loader: 'style-loader' },
      {
        loader: 'css-loader',
        options: {
          sourceMap: mode !== 'production'
        }
      }
    ]
  }

  const getPlugins = () => {
    const plugins = [
      new HTMLWebpackPlugin({
        title: 'Todos',
        template: './public/index.html'
      }),
      new CleanWebpackPlugin(),
      new Dotenv()
    ]

    if (mode === 'production') {
      plugins.push(
        new MiniCssExtractPlugin({
          filename: 'css/[name].[hash].min.css'
        })
      )
    }

    return plugins
  }

  return {
    mode,
    entry: ['@babel/polyfill', './src/index.tsx'],
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: mode === 'production' ? 'js/[name].[hash].min.js' : undefined
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js']
    },
    devServer: {
      watchFiles: ['./public/*.html'],
      open: true,
      port: 3000,
      historyApiFallback: true
    },
    plugins: getPlugins(),
    module: {
      rules: [
        {
          test: /\.m?ts$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-typescript']
            }
          }
        },
        {
          test: /\.m?tsx$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                '@babel/preset-react',
                '@babel/preset-typescript'
              ]
            }
          }
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            ...getStyleLoaders(),
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: [['autoprefixer']]
                }
              }
            },
            {
              loader: 'sass-loader'
            }
          ]
        },
        // loading images
        {
          test: /\.(jpg|jpeg|png)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'images/[hash][ext][query]'
          }
        },
        // loading icons
        {
          test: /\.(svg)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'images/icons/[hash][ext][query]'
          }
        },
        // loading fonts
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'fonts/[hash][ext][query]'
          }
        }
      ]
    }
  }
}
