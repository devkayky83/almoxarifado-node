import Fornecedor from "../../models/fornecedor.js";

async function criarFornecedor(req, res) {
    const fornecedor = await Fornecedor.create({
        nome: req.body.nome,
        email: req.body.email,
        endereco: req.body.email
    });
    res.render('alerts',{nome: 'Fornecedores', body: 'Fornecedor Criado.'});
};

async function listarFornecedor(req, res) {
    const fornecedores = await Fornecedor.findAll({raw: true});
    res.render('fornecedores/fornecedores', { fornecedores });
}

async function editarFornecedor(req, res) {
    const fornecedorEditar = await Fornecedor.findOne({ where: { id: req.body.id } });

    if (!fornecedorEditar) {
        return res.render('alerts', { title: 'Erro', body: 'Fornecedor não encontrado para edição.' });
    }

    res.render('fornecedores/editar', { fornecedor: fornecedorEditar });
}

async function salvarFornecedor(req, res) {
    const fornecedor = await Fornecedor.findOne({ where: { id: req.body.id } });

    if (!fornecedor) {
        return res.render('alerts', { title: 'Erro', body: 'Fornecedor não encontrado para salvar.' });
    }

    fornecedor.nome = req.body.nome;
    fornecedor.email = req.body.email;
    fornecedor.endereco = req.body.endereco   
    

    await fornecedor.save();

    res.render('alerts', { title: 'Sucesso', body: 'Fornecedor atualizado com sucesso.' });
}


async function deletarFornecedor(req, res) {
    const fornecedor = await Fornecedor.findOne({ where: { id: req.body.id } });

    if (!fornecedor) {
        return res.render('alerts', { title: 'Erro', body: 'Fornecedor não encontrado para deletar.' });
    }

    await fornecedor.destroy();

    res.render('alerts', { title: 'Sucesso', body: 'Fornecedor deletado com sucesso.' });
}

export { criarFornecedor, listarFornecedor, editarFornecedor, salvarFornecedor, deletarFornecedor };