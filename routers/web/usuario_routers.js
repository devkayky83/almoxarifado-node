import express from "express";
import { Router } from "express";

import {
  promptUsuario,
  criarUsuario,
  login,
  logout,
  promptLogin,
} from "../../controllers/web/usuario_controller.js";

const usuario_web_router = express.Router();

usuario_web_router.get("/registro", promptUsuario);
usuario_web_router.post("/registro", criarUsuario);
usuario_web_router.get("/login", promptLogin);
usuario_web_router.post("/login", login);
usuario_web_router.get("/logout", logout);

export default usuario_web_router;
