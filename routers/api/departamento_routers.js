import { criarDepartamento, deletarDepartamento, editarDepartamento, listarDepartamento } from "../../controllers/api/departamento_controller.js";
import { Router } from "express";

const departamento_router = Router();

departamento_router.get('/', listarDepartamento);
departamento_router.post('/', criarDepartamento);
departamento_router.put('/', editarDepartamento);
departamento_router.delete('/', deletarDepartamento);

export default departamento_router;