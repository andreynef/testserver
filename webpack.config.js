const path = require('path');//переделка относительного пути в абсолютный.
const HTMLWebpackPlugin = require('html-webpack-plugin');
const NODE_ENV = process.env.NODE_ENV;
const IS_DEV = NODE_ENV =='development';
const IS_PROD = NODE_ENV =='production';

const setupDevtool = () =>{
    if (IS_DEV) return 'eval';
    if (IS_PROD) return false;
};


module.exports = {
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json']
    },
    mode: NODE_ENV ? NODE_ENV : 'development',
    entry: path.resolve(__dirname, 'src/index.jsx'),
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [{
            test: /\.[tj]sx?$/,
            use: ['ts-loader']
        }]
    },
    plugins:[
        new HTMLWebpackPlugin({template: path.resolve(__dirname, 'index.html')})
    ],
    devServer: {
        port: 3000,
        open: true,
        hot: IS_DEV
    },
    devtool: setupDevtool()//формируются ли соурсмапы.
};

