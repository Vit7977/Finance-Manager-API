import { Router } from "express";
import CategoriaController from "../controllers/Categoria.js";


const router = Router();

router.get("/", CategoriaController.getAllCategories);

export default router;