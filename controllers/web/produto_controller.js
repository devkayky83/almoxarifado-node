import Produto from "../../models/produto.js";

async function criarProduto(req, res) {
    const produto = await Produto.create({
        id: req.body.id,
        nome: req.body.nome,
        tipo: req.body.tipo,
        quantidade: req.body.quantidade,
        data_fabricacao: req.body.data_fabricacao,
        data_validade: req.body.data_validade,
        observacoes: req.body.observacoes
    });
    res.render('alerts',{nome: 'Produtos', body: 'Produto Criado.'});
};

async function listarProduto(req, res) {
    const lista = await Produto.findAll();
    res.render('produtos/list', { lista });
}

async function editarProduto(req, res) {
    const produto = await Produto.findOne({ where: { id: req.body.id } });

    res.render('produtos/edit', { action: 'edit', produto_editing: produto.dataValues});
}

async function salvarProduto(req, res) {
    const produto = await produto.findOne({ where: { id: req.body.id } });

    produto.id = req.body.id;
    produto.nome = req.body.nome;   
    produto.tipo = req.body.tipo;
    produto.quantidade = req.body.quantidade;
    produto.data_fabricacao = req.body.data_fabricacao;
    produto.data_validade = req.body.data_validade;
    produto.observacoes = req.body.observacoes;

    await produto.save();

    res.render('alerts', { title: 'Produtos', body: 'Produto editado.' });
}

async function deletarProduto(req, res) {
    const produto = await Produto.findOne({ where: { id: req.body.id } });
    await produto.destroy();

     res.render('alerts', { title: 'Produtos', body: 'Produto deletado.' });
}

export { criarProduto, listarProduto, editarProduto, salvarProduto, deletarProduto };