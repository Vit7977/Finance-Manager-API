import { Router } from "express";
import UsuarioController from "../controllers/Usuario.js";

const router = Router();

router.get("/", UsuarioController.getAllUsers)

router.post("/", UsuarioController.createConta)

router.post("/login", UsuarioController.login)

router.put("/:id", (req, res)=>{

})

router.delete("/:id", (req, res)=>{

})

export default router;