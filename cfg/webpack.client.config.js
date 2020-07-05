const path = require('path');
const {HotModuleReplacementPlugin} = require('webpack'); //уже есть в вебпаке
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const NODE_ENV = process.env.NODE_ENV;
const IS_DEV = NODE_ENV =='development';
const IS_PROD = NODE_ENV =='production';

setupDevtool = () =>{
    if (IS_DEV) return 'eval';
    if (IS_PROD) return false;
}


module.exports = {
    mode: NODE_ENV ? NODE_ENV : 'development',
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
        alias: {//замена зависимости. Когда требуется то что слева, заменяется на то что справа
            'react-dom': IS_DEV ? '@hot-loader/react-dom' : 'react-dom',//реакт дом заменяется на пропатченный реакт дом, чтобы обновляться на горячую.(дев режим)
        }
    },
    entry: [
        path.resolve(__dirname, '../src/client/index.jsx'),//после этого модуля добавляем строку ниже
        'webpack-hot-middleware/client?path=http://localhost:3001/static/__webpack_hmr',//js код кот б добавлен в index.jsx в конец. Path указывает путь до нового сервера. Настройка запросов к серверу кот б отдавать данные с hmr.
        ],
    output: {
        path: path.resolve(__dirname, '../dist/client'),
        filename: 'client.js',
        publicPath: "/static/",//путь по кот б доступны наши статические ассеты chunks с файлами для hrm
    },
    module: {
        rules: [{
            test: /\.[tj]sx?$/,
            use: {
                loader: 'ts-loader',
            }
        },
        ]
    },
    devtool: setupDevtool(),
    plugins: IS_DEV
        ? [
        new CleanWebpackPlugin(),//удаление старых сгенерированных chunks при генерации новых js файлов при каждом изменении кода
        new HotModuleReplacementPlugin(),
        ]
        : [],
};

