import express from 'express';
import ReactDOM from 'react-dom/server';
import { Header } from '../shared/Header';
import { indexHtmlTemplate } from './indexHtmlTemplate';

const app = express();//инициализация. Теперь app это instance нашего приложения

app.use('/static', express.static('./dist/client'));//спец роут кот будет раздавать статические файлы. По urlу /static будут доступны все файлы кот лежат в папке dist/client.

app.get('/', (req,res) =>{
    res.send(
        indexHtmlTemplate(ReactDOM.renderToString(Header())),
    );
});
app.listen(3000, ()=>{
    console.log('server started on http://localhost:3000');
});