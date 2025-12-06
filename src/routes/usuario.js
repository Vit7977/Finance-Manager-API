import { Router } from "express";
import UsuarioController from "../controllers/Usuario.js";

const router = Router();

router.get("/", UsuarioController.getAllUsers)
router.get("/:cpf", UsuarioController.getUserByCPF)

router.post("/", UsuarioController.createAccount)

router.post("/login", UsuarioController.login)

router.put("/:id", UsuarioController.updateUser)

router.delete("/:id", UsuarioController.deleteUser)

export default router;