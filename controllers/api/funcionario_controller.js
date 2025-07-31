import Funcionario from "../../models/funcionario.js"

async function criarFuncionario(req, res) {
    const funcionario = await Funcionario.create({
        nome: req.body.nome,
        email: req.body.email,
        endereco: req.body.endereco,
        cargo: req.body.cargo,
        data_nascimento: req.body.data_nascimento

    });
    res.json(funcionario);
};

async function listarFuncionario(req, res) {
    const lista = await Funcionario.findAll();
    res.json(lista);
}

async function editarFuncionario(req, res) {

    const funcionario = await Funcionario.findOne({ where: { id: req.body.id } });

    funcionario.nome = req.body.nome;
    funcionario.email = req.body.email;
    funcionario.endereco = req.body.endereco;
    funcionario.cargo = req.body.cargo;
    funcionario.data_nascimento = req.body.data_nascimento;
    await funcionario.save();

    res.json({ mensage: 'Funcionario alterado.' });
}

async function deletarFuncionario(req, res) {

    const funcionario = await Funcionario.findOne({ where: { id: req.body.id } });
    await funcionario.destroy();

    res.json({ mensage: 'Funcionario removido.' });
}

export {criarFuncionario, listarFuncionario, editarFuncionario, deletarFuncionario};