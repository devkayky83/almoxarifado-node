import { criarProduto, deletarProduto, editarProduto, listarProduto } from "../../controllers/api/produto_controller.js";
import { Router } from "express";

const produto_router = Router();

produto_router.get('/', listarProduto);
produto_router.post('/', criarProduto);
produto_router.put('/', editarProduto);
produto_router.delete('/', deletarProduto);

export default produto_router;