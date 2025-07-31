import Funcionario from "../../models/funcionario.js";

async function criarFuncionario(req, res) {
    const funcionario = await Funcionario.create({
        nome: req.body.nome,
        email: req.body.email,
        endereco: req.body.email,
        cargo: req.body.cargo,
        data_nascimento: req.body.data_nascimento
    });
    res.render('alerts',{nome: 'Funcionario', body: 'Funcionario Criado.'});
};

async function listarFuncionario(req, res) {
    const funcionarios = await Funcionario.findAll({raw: true});
    res.render('funcionarios/funcionarios', { funcionarios });
}

async function editarFuncionario(req, res) {
    const funcionarioEditar = await Funcionario.findOne({ where: { id: req.body.id } });

    if (!funcionarioEditar) {
        return res.render('alerts', { title: 'Erro', body: 'Funcionario não encontrado para edição.' });
    }

    res.render('funcionarios/editar', { funcionario: funcionarioEditar });
}

async function salvarFuncionario(req, res) {
    const funcionario = await Funcionario.findOne({ where: { id: req.body.id } });

    if (!funcionario) {
        return res.render('alerts', { title: 'Erro', body: 'Funcionario não encontrado para salvar.' });
    }

    funcionario.nome = req.body.nome;
    funcionario.email = req.body.email;
    funcionario.endereco = req.body.endereco; 
    funcionario.cargo = req.body.cargo;
    funcionario.data_nascimento = req.body.data_nascimento;  

    await funcionario.save();

    res.render('alerts', { title: 'Sucesso', body: 'Funcionario atualizado com sucesso.' });
}


async function deletarFuncionario(req, res) {
    const funcionario = await Funcionario.findOne({ where: { id: req.body.id } });

    if (!funcionario) {
        return res.render('alerts', { title: 'Erro', body: 'Funcionario não encontrado para deletar.' });
    }

    await funcionario.destroy();

    res.render('alerts', { title: 'Sucesso', body: 'Funcionario deletado com sucesso.' });
}

export { criarFuncionario, listarFuncionario, editarFuncionario, salvarFuncionario, deletarFuncionario };