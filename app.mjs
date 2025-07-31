import express from 'express';
import produto_router from './routers/produto_routers.js';
import { syncer } from './database/mysql.js';
import './models/produto.js';

const conectado = await syncer();
if (conectado) {
    console.log('Banco sincronizado.');
}else {
    console.log('Erro ao conectar ao banco de dados.');
}

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
    res.end('Rodando');
});
app.use('/produtos', produto_router);

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");  
});