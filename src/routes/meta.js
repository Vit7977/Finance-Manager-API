import { Router } from "express";
import MetaController from '../controllers/Meta.js'

const router = Router();

router.get("/", MetaController.getAllGoals);
router.get("/:id", MetaController.getGoalById);

router.post("/", MetaController.createGoal);

router.put("/:id", MetaController.updateGoal);

router.delete("/:id", MetaController.deleteGoal);

export default router;