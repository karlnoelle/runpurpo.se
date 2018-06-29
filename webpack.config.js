// var webpack = require('webpack'); //need webpack to make the config work
// require the node externals module to tell webpack to not bundle node_modules /via https://github.com/webpack/webpack/issues/1576#issuecomment-353327280
const nodeExternals = require('webpack-node-externals');
const path = require('path');


module.exports = {
    entry: "./server/app.js",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname + "/dist")
    },
    mode: 'development',
    target: 'node', //in order to ignore built-in modules like path, fs, etc.
    externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
    devServer: {
        contentBase: __dirname + "/client",
        port: 3000
    }
};
