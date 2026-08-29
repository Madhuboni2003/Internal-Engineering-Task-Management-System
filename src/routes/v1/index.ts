import { Router } from "express";
import roleRouter from "./role.route.js";
import userRouter from "./user.route.js";
import authRouter from "./auth.route.js";
import projectRouter from "./project.route.js";
import { submissionRouter } from "./submission.route.js";

import taskRouter from "./task.route.js";
import { submissionRouter } from "./submission.route.js";
import unassignmentReasonRouter from "./unassignmentReason.route.js";
const router = Router();

router.use("/users", userRouter);
router.use("/roles", roleRouter);
router.use("/auth", authRouter);
router.use("/projects", projectRouter);
router.use("/tasks", taskRouter);
router.use("/submissions", submissionRouter);
router.use("/unassignment-reasons", unassignmentReasonRouter);

export default router;