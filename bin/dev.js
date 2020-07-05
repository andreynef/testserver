const webpack = require('webpack');
const [webpackClientConfig, webpackServerConfig] = require ('../webpack.config.js');
const nodemon = require('nodemon');
const path = require('path');
const webpackDevMiddleware = require ('webpack-dev-middleware');
const webpackHotMiddleware = require ('webpack-hot-middleware');
const express = require ('express');

const hmrServer = express();
const clientCompiler = webpack(webpackClientConfig);

hmrServer.use(webpackDevMiddleware(clientCompiler, {
    publicPath: webpackClientConfig.output.publicPath, //
    serverSideRender: true,
    noInfo: true,//чтобы инфа не сыпалась в консоль
    watchOptions: {
        ignore: /dist/, //при кажд компиляции не смотреть и пересобирал приложение
    },
    writeToDisk: true,//по умолчанию девмидлвэр не пишет на диск, но чтобы раздавать client.js из папки static и hotupdate нашему express серверам а не webpack-dev-serverам, нам нужно их писать.
    stats: 'errors-only',//выключаем лишнюю инфу кроме ошибок в консоли.
}));

hmrServer.use(webpackHotMiddleware(clientCompiler, {
    path: '/static/__webpack_hmr',//путь кот позволит серверу отдавать данные с hmr.
}));

hmrServer.listen(3001, ()=>{
    console.log ('Hmr server successfully started');
})

const compiler = webpack(webpackServerConfig);//серверная часть остается неизменной

compiler.run((err)=>{//холодный старт приложения
    if(err){
        console.log('Compilation failed:', err);
    }
    compiler.watch({}, (err) => {//1 арг options пустой тк дефолт сойдет, 2 арг handler
        if(err){
            console.log('Compilation failed:', err);
        }
        console.log('Compilation was successfull');
    });

    nodemon({
        script: path.resolve(__dirname, '../dist/server/server.js'),
        watch: [
            path.resolve(__dirname, "../dist/server"),
            path.resolve(__dirname, "../dist/client"),
        ]
    })
})
