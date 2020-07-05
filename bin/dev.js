const webpack = require('webpack');
const webpackConfig = require ('../webpack.config.js');
const nodemon = require('nodemon');
const path = require('path');


const compiler = webpack(webpackConfig);

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
