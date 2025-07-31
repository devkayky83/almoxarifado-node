import Produto from "../../models/produto.js";

async function criarProduto(req, res) {
    const produto = await Produto.create({
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
    const produtos = await Produto.findAll({raw: true});
    res.render('produtos/produtos', { produtos });
}

async function editarProduto(req, res) {
    const produtoEditar = await Produto.findOne({ where: { id: req.body.id } });

    if (!produtoEditar) {
        return res.render('alerts', { title: 'Erro', body: 'Produto não encontrado para edição.' });
    }

    res.render('produtos/editar', { produto: produtoEditar });
}

async function salvarProduto(req, res) {
    const produto = await Produto.findOne({ where: { id: req.body.id } });

    if (!produto) {
        return res.render('alerts', { title: 'Erro', body: 'Produto não encontrado para salvar.' });
    }

    produto.nome = req.body.nome;   
    produto.tipo = req.body.tipo;
    produto.quantidade = req.body.quantidade;
    produto.data_fabricacao = req.body.data_fabricacao;
    produto.data_validade = req.body.data_validade;
    produto.observacoes = req.body.observacoes;

    await produto.save();

    res.render('alerts', { title: 'Sucesso', body: 'Produto atualizado com sucesso.' });
}


async function deletarProduto(req, res) {
    const produto = await Produto.findOne({ where: { id: req.body.id } });

    if (!produto) {
        return res.render('alerts', { title: 'Erro', body: 'Produto não encontrado para deletar.' });
    }

    await produto.destroy();

    res.render('alerts', { title: 'Sucesso', body: 'Produto deletado com sucesso.' });
}

export { criarProduto, listarProduto, editarProduto, salvarProduto, deletarProduto };