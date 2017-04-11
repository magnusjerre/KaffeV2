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
                test: /\.png$/, loader: 'file-loader', options: {
                    name: './../images/[name].[ext]'    //The path relative to entry.js to the images location
                }
            },
            {
                test: /\.scss$/, use: [
                {
                    loader: 'style-loader'
                },
                {
                    loader: 'css-loader'
                },
                {
                    loader: 'sass-loader'
                }
                ]
            }
        ]
    // },
    // externals: {
    //     "react": "React",
    //     "react-dom": "ReactDOM"
    }
};