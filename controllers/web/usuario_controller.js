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

async function promptLogin(req, res) {
  res.render("usuarios/login");
}

async function login(req, res) {
  const usuario = await Usuario.findOne({
    where: {
      [Op.or]: {
        email: req.body.nome_usuario_or_email,
        nome_usuario: req.body.nome_usuario_or_email,
      },
    },
  });

  if (usuario) {
    const resultado = await bcrypt.compare(req.body.senha, usuario.senha);

    if (resultado) {
      req.session.regenerate(async (err) => {
        req.session.usuario = usuario;

        req.app.locals.usuario = usuario;

        res.redirect("/");
      });
    }
  } else {
    res.redirect("/usuarios/login");
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

export {promptUsuario, criarUsuario, promptLogin, login, logout, checkLogged};