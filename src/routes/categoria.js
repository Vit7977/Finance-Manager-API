import { Router } from "express";
import CategoriaController from "../controllers/Categoria.js";


const router = Router();

router.get("/", CategoriaController.getAllCategories);
router.get("/:id", CategoriaController.getNatureById);

export default router;