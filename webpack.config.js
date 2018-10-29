const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const MiniCssExtractPlugin = require("mini-css-extract-plugin");


module.exports = {
  entry: './src/index.js',
  output: {
    filename: './js/[name].js',
    path: path.resolve(__dirname, 'public')
  },
  resolve: {
    modules: ['node_modules'],
   /*  alias: {
        "TweenLite": __dirname + '/node_modules/gsap/src/uncompressed/TweenLite.js',
        "TweenMax": __dirname + '/node_modules/gsap/src/uncompressed/TweenMax.js',
        "TimelineLite": __dirname + '/node_modules/gsap/src/uncompressed/TimelineLite.js',
        "TimelineMax": __dirname + '/node_modules/gsap/src/uncompressed/TimelineMax.js',
        "ScrollMagic": __dirname + '/node_modules/scrollmagic/scrollmagic/uncompressed/ScrollMagic.js',
        "animation.gsap": __dirname + '/node_modules/scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap.js',
        "debug.addIndicators": __dirname + '/node_modules/scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators.js'
    } */
  },
  devtool: 'cheap-module-source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        },
        exclude: path.resolve(__dirname, "node_modules")
      },
      {
        test:/\.(s*)css$/, 
        use: [
          {
            loader:'style-loader',
            options: {
              sourceMap: true
            }
          },
         /*  {
            loader: env.production ? MiniCssExtractPlugin.loader :  ,
            options: {
              // you can specify a publicPath here
              // by default it use publicPath in webpackOptions.output
              publicPath: path.join(__dirname, 'public ')
            }
          }, */
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader:'sass-loader',
            options: {
              souceMap: true
            }
          }
        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg|ico)$/i, 
        loader: "file-loader?name=/public/assets/imgs/[name].[ext]"
      },
      {
        test: /\.(wof?f|ttf|eof|svg|ico)$/i, 
        loader: "file-loader?name=/public/assets/fonts/[name].[ext]"
      },
      {
        test: /\.(obj|gltf|fbx)$/i, 
        loader: "file-loader?name=/public/assets/models/[name].[ext]"
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    port: 8000,
    watchContentBase: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
    }
  },
  plugins: [
   // new BundleAnalyzerPlugin(),
    new HTMLWebpackPlugin({
       template: path.resolve(__dirname, 'src/index.html'),

    }),
    new CopyWebpackPlugin([{
      from: 'src/assets',
      to: 'assets'
    }]),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ],
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          chunks: "initial",
          name: "vendor",
          priority: 10,
          enforce: true
        },
        commons: {
          chunks: "initial",
          name: 'main',
          minChunks: 1,
          maxInitialRequests: 10, // The default limit is too small to showcase the effect
          minSize: 0 // This is example is too small to create commons chunks
        },
      }
    }
  }
};