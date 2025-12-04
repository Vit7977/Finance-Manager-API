import { Router } from "express";
import UsuarioController from "../controllers/Usuario.js";

const router = Router();

router.get("/", UsuarioController.getAllUsers)

router.post("/", (req, res)=>{

})

router.put("/:id", (req, res)=>{

})

router.delete("/:id", (req, res)=>{

})

export default router;