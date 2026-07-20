import { Router, type IRouter } from "express";
import healthRouter from "./health";
import sofascoreRouter from "./sofascore";
import analyticsRouter from "./analytics";

const router: IRouter = Router();

router.use(healthRouter);
router.use(sofascoreRouter);
router.use(analyticsRouter);

export default router;
