module.exports = {
    entry: ['./entry.js'],
    output: {
        path: __dirname,
        filename: 'dist.js'
    },
    resolve: {
        alias: {
            'lookview': require('path').resolve('../../dist/lookview.js')
        }
    },
    devServer: {
        contentBase: './',
        compress: true,
        host: 'localhost',
        port: '20000',
        hot: true,
        inline: true,
        historyApiFallback: true,
        disableHostCheck: true,
        watchOptions: {
            poll: true,
            ignored: /node_modules/,
            aggregateTimeout: 300
        }
    },
    mode: 'development'
};
