module.exports = {
    entry: __dirname + '/src/main/resources/static/js/entry.js',
    devtool: 'source-map',
    output: {
        path: __dirname + '/src/main/resources/static/js',
        filename: "bundle.js"
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader',
            }
        ]
    }
};