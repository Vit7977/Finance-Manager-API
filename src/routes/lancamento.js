import { Router } from "express";
import LancamentoController from '../controllers/Lancamento.js'

const router = Router();

router.get("/", LancamentoController.getAllEntries);
router.get("/:num_conta", LancamentoController.getEntriesByAccountNum);
router.get("/:id", LancamentoController.getEntryById);

router.post("/", LancamentoController.createEntry);

router.put("/:id", LancamentoController.updateEntry);

router.delete("/:id", LancamentoController.deleteEntry);

export default router;