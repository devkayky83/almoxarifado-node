import { Op } from "sequelize";
import Usuario from "../../models/usuario.js";
import bcrypt from "bcrypt";

async function promptUsuario(req, res) {
  res.render("usuarios/registro");
}

async function criarUsuario(req, res) {
  try {
    const senha = await bcrypt.hash(req.body.senha, 10);

    const usuario = await Usuario.create({
      nome: req.body.nome,
      nome_usuario: req.body.nome_usuario,
      email: req.body.email,
      senha: senha,
    });

    res.redirect("/usuarios/login");
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      console.error('Erro: nome de usuário ou e-mail já em uso.');
      res.render('usuarios/registro', {
        error: 'Nome de usuário ou e-mail já em uso. Por favor, tente outro.',
        nome: req.body.nome,
        nome_usuario: req.body.nome_usuario,
        email: req.body.email
      });
    } else {
      console.error('Erro ao criar o usuário:', error);
      res.render('error_page', { message: 'Ocorreu um erro inesperado.' });
    }
  }
}

async function listarFuncionarios(req, res) {
  try {
    const usuarios = await Usuario.findAll(); 

    console.log("Usuários encontrados no banco de dados:", usuarios)

    res.render("funcionarios/funcionarios", { funcionarios: usuarios });
  } catch (error) {
    console.error("Erro ao listar funcionários:", error);
    res.status(500).send("Erro interno do servidor.");
  }
}

async function promptLogin(req, res) {
  res.render("usuarios/login");
}

async function login(req, res) {
  const { nome_usuario, senha } = req.body;
  try {
    const usuario = await Usuario.findOne({ where: { nome_usuario } });

    if (!usuario) {
      return res.render("login", {
        layout: "main",
        login_fail: true,
        message: "Usuário não encontrado.",
      });
    }

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);
    if (!senhaCorreta) {
      return res.render("login", {
        layout: "main",
        login_fail: true,
        message: "Senha incorreta.",
      });
    }
    
    req.session.usuario = usuario.get({ plain: true });

    res.redirect("/");

  } catch (error) {
    console.error(error);
    return res.status(500).send("Erro interno do servidor.");
  }
}

async function logout(req, res) {
  req.session.regenerate((err) => console.error(err));
  req.session.destroy();
  req.app.locals.usuario = null;
  res.redirect("/usuarios/login");
}

async function checkLogged(req, res, next) {
  if (req.session && req.session.usuario) {
    req.app.locals.usuario = req.session.usuario;
    next();
  } else {
    req.app.locals.usuario = null;

    res.redirect("/usuarios/login");
  }
}

export {promptUsuario, criarUsuario, promptLogin, login, logout, listarFuncionarios, checkLogged};