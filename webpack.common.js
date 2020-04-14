const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const {ProgressPlugin} = require('webpack');

const handler = (percentage, message, ...args) => {
    console.info(`${(percentage * 100).toFixed()}% ${message}`);
  };

module.exports = {
    entry: "./src/app.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[chunkhash].bundle.js"
    },
    module: {
        rules: [
           
            {
                test: /\.css$/i,
                exclude: /styles/,
                use: ["to-string-loader", "css-loader"]
            },
            
            {
                test: /\.css$/i,
                include: /styles/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.scss$/,
                loader: 'style-loader!css-loader!sass-loader'
            },
              
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            filename: "index.html"
        }),
        new ProgressPlugin(handler)
    ]
}