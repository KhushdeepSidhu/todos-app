const path = require ( 'path' )

module.exports = {

    entry: [ 'babel-polyfill', './src/index.js' ],
    output: {
        path: path.resolve ( __dirname, 'public/scripts' ),
        filename: 'bundle.js'
    },

    // babel configuratiom
    module: {
        rules: [ {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: [ 'env' ]
                }
            }
        } ]
    },

    // webpack-dev-server configuration
    devServer: {
        contentBase: path.resolve ( __dirname, 'public' ),
        publicPath: '/scripts/'
    },

    // configure source map
    devtool: 'source-map'

}