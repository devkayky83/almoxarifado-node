import { criarDepartamento, deletarDepartamento, editarDepartamento, salvarDepartamento, listarDepartamento} from "../../controllers/web/departamento_controller.js";
import { Router } from "express";

const departamento_web_router = Router();

departamento_web_router.get('/', listarDepartamento);
departamento_web_router.post('/create', criarDepartamento);
departamento_web_router.post('/edit', editarDepartamento);
departamento_web_router.post('/save', salvarDepartamento);
departamento_web_router.post('/delete', deletarDepartamento);

export default departamento_web_router;