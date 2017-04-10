module.exports = {
    entry: __dirname + '/src/main/resources/static/js/entry.tsx',
    devtool: 'source-map',
    output: {
        path: __dirname + '/src/main/resources/static/js',
        filename: "bundle.js"
        // publicPath: 'https://kaffe-ala-jerre-v2.herokuapp.com'
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".json"]
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/, loader: "awesome-typescript-loader"
            },
            {
                test: /\.css$/, loader: 'style-loader!css-loader'
            },
            {
                test: /\.png$/, loader: 'file-loader', options: {
                    name: './../images/[name].[ext]'    //The path relative to entry.js to the images location
                }
            }
        ]
    // },
    // externals: {
    //     "react": "React",
    //     "react-dom": "ReactDOM"
    }
};