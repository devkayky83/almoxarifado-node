import { criarProduto, deletarProduto, editarProduto, salvarProduto, listarProduto} from "../../controllers/web/produto_controller.js";
import { Router } from "express";

const produto_web_router = Router();

produto_web_router.get('/list', listarProduto);
produto_web_router.post('/create', criarProduto);
produto_web_router.post('/edit', editarProduto);
produto_web_router.post('/save', salvarProduto);
produto_web_router.post('/delete', deletarProduto);

export default produto_web_router;