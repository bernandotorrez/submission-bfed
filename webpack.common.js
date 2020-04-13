const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
    entry: "./src/app.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[chunkhash].bundle.js",
        chunkFilename: "[id].js",
        chunkLoadTimeout: 30000
    },
    module: {
        rules: [
            /* rules buat component */
            {
                test: /\.css$/i,
                exclude: /styles/,
                use: ["to-string-loader", "css-loader"]
            },
            /* rules buat global style */
            {
                test: /\.css$/i,
                include: /styles/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.scss$/,
                loader: 'style-loader!css-loader!sass-loader'
              },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                  {
                    loader: 'file-loader',
                    options: {
                      name: '[name].[ext]',
                      outputPath: 'fonts/'
                    }
                  }
                ]
              },
              
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            filename: "index.html"
        })
    ]
}