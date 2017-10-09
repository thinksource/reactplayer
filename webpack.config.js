const path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
// sassThreadLoader.warmup({ workerParallelJobs: 2 }, [
//   'sass-loader',
//   'postcss-loader',
//   'css-loader',
//   'style-loader',
//   'babel-loader',
// ]);
module.exports={
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    'react-hot-loader/patch'//,
    //path.resolve(__dirname,'./app/index.js')
  ],
  output:{
    path:path.resolve(__dirname,'./dist'),
    filename:'bundle.js',
    publicPath:"/assets/"
  },
  plugins:[
    new HtmlWebpackPlugin({
      template:'./index.tpl.html',
      inject:'body',
      filename:'./index.html'
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NOOE_ENV':JSON.stringify('development')
    })
  ],
  module:{
    rules:[
      {
        test: /\.(js|jsx)?$/,
        include:[
          path.resolve(__dirname, 'app')
        ],
        exclude:[
          path.resolve(__dirname,'app/demo')
        ],
        loader:"babel-loader",
        options:{
          presets:["es2015","react"]
        },
      },
      // {
      //   test:/\.html$/,
      //   use: [
      //     "htmllint-loader",
      //     {
      //       loader: "html-loader",
      //       options: {
      //         /* ... */
      //       }
      //     }
      //   ]
      // },
      {
        test: /\.less$/,
        use: [
          "style-loader",
          "css-loader",
          "less-loader"
        ]
      },
    ]
  }
}
