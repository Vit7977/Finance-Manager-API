import { Router } from "express";
import LancamentoController from '../controllers/Lancamento.js'

const router = Router();

router.get("/", LancamentoController.getAllLaunchments);

router.post("/", (_, res) => {});

router.put("/:id", (_, res) => {});

router.delete("/:id", (_, res) => {});

export default router;