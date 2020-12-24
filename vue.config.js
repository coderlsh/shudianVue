const path = require('path');

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin 

const webpack = require('webpack')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const productionGzipExtensions = ['js', 'css']
const isProduction = process.env.NODE_ENV === 'production'

module.exports = {
    lintOnSave: false,
    productionSourceMap: false,
    devServer: {
        //port: 8090,
        host: 'localhost',
        open: false,
        hotOnly:true,
        proxy: {
          '/api': {
            target: 'http://172.16.10.177:9002/electron/', //设置调用的接口域名和端口号
            changeOrigin: true, //允许跨域
            ws: false,
            pathRewrite: {
              '^/api': ''
            }
          }
        }
    },
    configureWebpack: {
      resolve: {
          alias: {
              'assets': '@/assets',
              'common': '@/common',
              'components': '@/components',
              'network': '@/network',
              'views': '@/views'
          }
      },
      plugins: [
        new BundleAnalyzerPlugin({ analyzerPort: 8919 }),

        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        
        // 下面是下载的插件的配置
        new CompressionWebpackPlugin({
          algorithm: 'gzip',
          test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
          threshold: 10240,
          minRatio: 0.8
        }),
        new webpack.optimize.LimitChunkCountPlugin({
          maxChunks: 5, 
          minChunkSize: 100
        })
      ]
    },
    publicPath: './' 
}