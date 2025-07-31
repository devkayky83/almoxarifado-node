import Departamento from "../../models/departamento.js"

async function criarDepartamento(req, res) {
    const departamento = await Departamento.create({
        nome: req.body.nome,
        representante: req.body.representante,
        email: req.body.email,
        data_criacao: req.body.data_criacao
    });
    res.json(departamento);
};

async function listarDepartamento(req, res) {
    const lista = await Departamento.findAll();
    res.json(lista);
}

async function editarDepartamento(req, res) {

    const departamento = await Departamento.findOne({ where: { id: req.body.id } });

    departamento.nome = req.body.nome;
    departamento.representante = req.body.representante;
    departamento.email = req.body.email;
    departamento.data_criacao = req.body.data_criacao;
    await departamento.save();

    res.json({ mensage: 'Departamento alterado.' });
}

async function deletarDepartamento(req, res) {

    const departamento = await Departamento.findOne({ where: { id: req.body.id } });
    await departamento.destroy();

    res.json({ mensage: 'Departamento removido.' });
}

export {criarDepartamento, listarDepartamento, editarDepartamento, deletarDepartamento};