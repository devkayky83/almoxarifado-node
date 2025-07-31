import Fornecedor from "../../models/fornecedor.js"

async function criarFornecedor(req, res) {
    const fornecedor = await Fornecedor.create({
        nome: req.body.nome,
        email: req.body.email,
        endereco: req.body.endereco
    });
    res.json(fornecedor);
};

async function listarFornecedor(req, res) {
    const lista = await Fornecedor.findAll();
    res.json(lista);
}

async function editarFornecedor(req, res) {

    const fornecedor = await Fornecedor.findOne({ where: { id: req.body.id } });

    fornecedor.nome = req.body.nome;
    fornecedor.email = req.body.email;
    fornecedor.endereco = req.body.endereco;
    await fornecedor.save();

    res.json({ mensage: 'Fornecedor alterado.' });
}

async function deletarFornecedor(req, res) {

    const fornecedor = await Fornecedor.findOne({ where: { id: req.body.id } });
    await fornecedor.destroy();

    res.json({ mensage: 'Fornecedor removido.' });
}

export {criarFornecedor, listarFornecedor, editarFornecedor, deletarFornecedor};