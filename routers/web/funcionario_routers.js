import { criarFuncionario, deletarFuncionario, editarFuncionario, salvarFuncionario} from "../../controllers/web/funcionario_controller.js";
import { listarFuncionarios } from "../../controllers/web/usuario_controller.js";
import { Router } from "express";
import express from "express";

const funcionario_web_router = express.Router();

funcionario_web_router.get('/', listarFuncionarios);
funcionario_web_router.post('/create', criarFuncionario);
funcionario_web_router.post('/edit', editarFuncionario);
funcionario_web_router.post('/save', salvarFuncionario);
funcionario_web_router.post('/delete', deletarFuncionario);

export default funcionario_web_router;