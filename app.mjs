import express from "express";
import { create } from "express-handlebars";
import { syncer } from "./database/mysql.js";
import css from 'connect-session-sequelize';
import session from 'express-session';
import "./models/produto.js";
import "./models/usuario.js"; 

import produto_web_router from "./routers/web/produto_routers.js";
import fornecedor_web_router from "./routers/web/fornecedor_routers.js";
import departamento_web_router from "./routers/web/departamento_routers.js";
import funcionario_web_router from "./routers/web/funcionario_routers.js";
import usuario_web_router from "./routers/web/usuario_routers.js";

import { listarProduto, editarProduto, deletarProduto } from "./controllers/web/produto_controller.js";
import { listarFornecedor, editarFornecedor, deletarFornecedor } from "./controllers/web/fornecedor_controller.js";
import { listarDepartamento, editarDepartamento, deletarDepartamento } from "./controllers/web/departamento_controller.js";

import { checkLogged, listarFuncionarios, logout } from "./controllers/web/usuario_controller.js";

import sequelize from "./database/mysql.js";

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
        eq: function(arg1, arg2) {
            return (arg1 == arg2);
        },
        inc: function(arg1, arg2) {
            if(typeof arg1 == 'undefined') {
                return false;
            }
            return (arg1.indexOf(arg2) !== -1);
        }
    },
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
        secure: false, 
        httpOnly: true
    },
    saveUninitialized: false, 
    resave: false
}));

await sequelizeStore.sync();    

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.use((req, res, next) => {
    res.locals.current_path = req.path;
    next();
});
app.set("views", "./views");
app.use(express.static("public"));

app.use("/usuarios", usuario_web_router);
app.get("/logout", logout);

app.use(checkLogged);

app.get("/", (req, res) => {
    if (req.session && req.session.usuario) {
        res.render("home", { title: "Home" });
    } else {
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

app.get("/funcionarios", listarFuncionarios);
app.use("/funcionarios", funcionario_web_router);

app.listen(80, () => {
    console.log("Servidor rodando na porta 80");
});
