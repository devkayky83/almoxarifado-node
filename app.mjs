import express from 'express';;
import { create } from 'express-handlebars';
import { syncer } from './database/mysql.js';
import './models/produto.js';

import produto_web_router from './routers/web/produto_routers.js';
import { listarProduto } from './controllers/web/produto_controller.js';
import { editarProduto } from './controllers/web/produto_controller.js';
import { deletarProduto } from './controllers/web/produto_controller.js';

const conectado = await syncer();
if (conectado) {
    console.log('Banco sincronizado.');
}else {
    console.log('Erro ao conectar ao banco de dados.');
}

const app = express();

const hbs = create({
    extname: 'handlebars',
    defaultLayout: 'main',
    layoutsDir: './views/layout/',
    partialsDir: './views/partials/',
    helpers: {
    ifCond: function (v1, v2, options) {
      return v1 === v2 ? options.fn(this) : options.inverse(this);
    }
}
});

app.use(express.json());  
app.use(express.urlencoded({extended: true}));
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', './views');
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('home', { title: 'Home' });
});

app.get('/produtos', listarProduto);
app.post('/produtos', editarProduto)
app.post('/produtos', deletarProduto);

app.use('/produtos', produto_web_router);

app.listen(80, () => {
    console.log("Servidor rodando na porta 80");  
});