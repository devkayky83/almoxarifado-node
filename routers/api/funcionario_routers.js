import { criarFuncionario, deletarFuncionario, editarFuncionario, listarFuncionario } from "../../controllers/api/funcionario_controller.js";
import { Router } from "express";

const funcionario_router = Router();

funcionario_router.get('/', listarFuncionario);
funcionario_router.post('/', criarFuncionario);
funcionario_router.put('/', editarFuncionario);
funcionario_router.delete('/', deletarFuncionario);

export default funcionario_router;