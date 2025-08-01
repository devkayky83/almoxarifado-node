import Departamento from "../../models/departamento.js";

async function criarDepartamento(req, res) {
    const departamento = await Departamento.create({
        nome: req.body.nome,
        representante: req.body.representante,
        email: req.body.email,
        data_criacao: req.body.data_criacao
    });
    res.render('alerts',{nome: 'Departamentos', body: 'Departamento Criado.'});
};

async function listarDepartamento(req, res) {
    const departamentos = await Departamento.findAll({raw: true});
    res.render('departamentos/departamentos', { departamentos });
}

async function editarDepartamento(req, res) {
    const departamentoEditar = await Departamento.findOne({ where: { id: req.body.id } });

    if (!departamentoEditar) {
        return res.render('alerts', { title: 'Erro', body: 'Departamento não encontrado para edição.' });
    }

    res.render('departamentos/edicao', { departamento: departamentoEditar.get({ plain: true }) });
}

async function salvarDepartamento(req, res) {
    const departamento = await Departamento.findOne({ where: { id: req.body.id } });

    if (!departamento) {
        return res.render('alerts', { title: 'Erro', body: 'Departamento não encontrado para salvar.' });
    }

    departamento.nome = req.body.nome;
    departamento.representante = req.body.representante;
    departamento.email = req.body.email;
    departamento.data_criacao = req.body.data_criacao;   

    await departamento.save();

    res.render('alerts', { title: 'Sucesso', body: 'Departamento atualizado com sucesso.' });
}


async function deletarDepartamento(req, res) {
    const departamento = await Departamento.findOne({ where: { id: req.body.id } });

    if (!departamento) {
        return res.render('alerts', { title: 'Erro', body: 'Departamento não encontrado para deletar.' });
    }

    await departamento.destroy();

    res.render('alerts', { title: 'Sucesso', body: 'Departamento deletado com sucesso.' });
}

export { criarDepartamento, listarDepartamento, editarDepartamento, salvarDepartamento, deletarDepartamento };