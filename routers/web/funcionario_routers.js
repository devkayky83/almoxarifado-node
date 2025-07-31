import { criarFuncionario, deletarFuncionario, editarFuncionario, salvarFuncionario, listarFuncionario} from "../../controllers/web/funcionario_controller.js";
import { Router } from "express";

const funcionario_web_router = Router();

funcionario_web_router.get('/', listarFuncionario);
funcionario_web_router.post('/create', criarFuncionario);
funcionario_web_router.post('/edit', editarFuncionario);
funcionario_web_router.post('/save', salvarFuncionario);
funcionario_web_router.post('/delete', deletarFuncionario);

export default funcionario_web_router;