import { criarFornecedor, deletarFornecedor, editarFornecedor, salvarFornecedor, listarFornecedor} from "../../controllers/web/fornecedor_controller.js";
import { Router } from "express";

const fornecedor_web_router = Router();

fornecedor_web_router.get('/', listarFornecedor);
fornecedor_web_router.post('/create', criarFornecedor);
fornecedor_web_router.post('/edit', editarFornecedor);
fornecedor_web_router.post('/save', salvarFornecedor);
fornecedor_web_router.post('/delete', deletarFornecedor);

export default fornecedor_web_router;