module.exports = {
    entry: __dirname + '/src/main/resources/static/js/entry.js',
    devtool: 'source-map',
    output: {
        path: __dirname + '/src/main/resources/static/js',
        filename: "bundle.js"
        // publicPath: 'https://kaffe-ala-jerre-v2.herokuapp.com'
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
            },
            {
                test: /\.png/,
                loader: 'file-loader',
                options: {
                    name: './../images/[name].[ext]'//The path relative to entry.js to the images location
                }
            }
        ]
    }
};