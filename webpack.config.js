const path = require('path');
const webpack = require('webpack');

module.exports = {
    mode: 'production',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname),
        publicPath: '/',
        filename: 'index.js',
        library: {
          name: 'trust-center',
          type: 'umd'
        }
    },
    optimization: {
        minimize: false
    },
    module: {
        noParse: /\.wasm$/,
        rules: [
            {
                test: /\.wasm$/,
                loader: 'base64-loader',
                type: 'javascript/auto',
            },
        ],
    },
    resolve: {
        fallback: {
            path: false,
            fs: false,
            process: false,
            crypto: require.resolve("crypto-browserify"),
            buffer: require.resolve("buffer"),
            stream: require.resolve("stream-browserify"),
            constants: require.resolve("constants-browserify")
        },
    },
    plugins: [
      new webpack.ProvidePlugin({
          Buffer: ['buffer', 'Buffer'],
      }),
      new webpack.ProvidePlugin({
          process: 'process/browser',
      })
    ]
};
