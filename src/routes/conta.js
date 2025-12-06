import { Router } from "express";
import ContaController from "../controllers/Conta.js";

const router = Router();

router.get("/", ContaController.getAllAccounts)
router.get("/:num", ContaController.getAccountByNum)

router.put("/:num", ContaController.updateStatus)

export default router;