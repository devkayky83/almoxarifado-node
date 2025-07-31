import { criarFornecedor, deletarFornecedor, editarFornecedor, listarFornecedor } from "../../controllers/api/fornecedor_controller.js";
import { Router } from "express";

const fornecedor_router = Router();

fornecedor_router.get('/', listarFornecedor);
fornecedor_router.post('/', criarFornecedor);
fornecedor_router.put('/', editarFornecedor);
fornecedor_router.delete('/', deletarFornecedor);

export default fornecedor_router;