import express from "express";
import { create } from "express-handlebars";
import { syncer } from "./database/mysql.js";
import css from 'connect-session-sequelize';
import session from 'express-session';
import "./models/produto.js";

import produto_web_router from "./routers/web/produto_routers.js";
import fornecedor_web_router from "./routers/web/fornecedor_routers.js";
import departamento_web_router from "./routers/web/departamento_routers.js";
import funcionario_web_router from "./routers/web/funcionario_routers.js";
import usuario_web_router from "./routers/web/usuario_routers.js";

import { listarProduto } from "./controllers/web/produto_controller.js";
import { editarProduto } from "./controllers/web/produto_controller.js";
import { deletarProduto } from "./controllers/web/produto_controller.js";

import { listarFornecedor } from "./controllers/web/fornecedor_controller.js";
import { editarFornecedor } from "./controllers/web/fornecedor_controller.js";
import { deletarFornecedor } from "./controllers/web/fornecedor_controller.js";

import { listarDepartamento } from "./controllers/web/departamento_controller.js";
import { editarDepartamento } from "./controllers/web/departamento_controller.js";
import { deletarDepartamento } from "./controllers/web/departamento_controller.js";

import { listarFuncionario } from "./controllers/web/funcionario_controller.js";
import { editarFuncionario } from "./controllers/web/funcionario_controller.js";
import { deletarFuncionario } from "./controllers/web/funcionario_controller.js";

import sequelize from "./database/mysql.js";
import { checkLogged } from "./controllers/web/usuario_controller.js";

const conectado = await syncer();
if (conectado) {
  console.log("Banco sincronizado.");
} else {
  console.log("Erro ao conectar ao banco de dados.");
}

const app = express();

const hbs = create({
  extname: "handlebars",
  defaultLayout: "main",
  layoutsDir: "./views/layout/",
  partialsDir: "./views/partials/",
  helpers: {
    ifCond: function (v1, v2, options) {
      return v1 === v2 ? options.fn(this) : options.inverse(this);
    },
  },
});

hbs.handlebars.registerHelper('eq', function(arg1, arg2) {
    return (arg1 == arg2);
});

hbs.handlebars.registerHelper('inc', function(arg1, arg2) {
    if(typeof arg1 == 'undefined') {
        return false;
    }
    return (arg1.indexOf(arg2) !== -1);
});

const SequelizeStore = css(session.Store);

const sequelizeStore = new SequelizeStore({
    db: sequelize,
    tableName: 'sessions',
    checkExpirationInterval: 5 * 60 * 1000,
    expiration: 1 * 60 * 60 * 1000 
});

app.use(session({
    secret: '*&long+and+secure+secret=%445',
    name: 'sess_cookie_param',
    store: sequelizeStore,

    cookie: {
        maxAge: 1 * 60 * 60 * 1000,
        secure: false, // if using HTTPS
        httpOnly: true // somente browsers
    },

    saveUninitialized: false, 
    resave: false
}));

await sequelizeStore.sync();    


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.set("views", "./views");
app.use(express.static("public"));

app.use("/usuarios", usuario_web_router);
app.use(checkLogged);

app.get("/", (req, res) => {
  if (req.session && req.session.usuario) {
    res.render("home", { title: "Home" });
  }else {
    res.redirect("/usuarios/login");
  }
});

app.get("/produtos", listarProduto);
app.post("/produtos", editarProduto);
app.post("/produtos", deletarProduto);

app.use("/produtos", produto_web_router);

app.get("/fornecedores", listarFornecedor);
app.post("/fornecedores", editarFornecedor);
app.post("/fornecedores", deletarFornecedor);

app.use("/fornecedores", fornecedor_web_router);

app.get("/departamentos", listarDepartamento);
app.post("/departamentos", editarDepartamento);
app.post("/departamentos", deletarDepartamento);

app.use("/departamentos", departamento_web_router);

app.get("/funcionarios", listarFuncionario);
app.post("/funcionarios", editarFuncionario);
app.post("/funcionarios", deletarFuncionario);

app.use("/funcionarios", funcionario_web_router);

app.listen(80, () => {
  console.log("Servidor rodando na porta 80");
});
