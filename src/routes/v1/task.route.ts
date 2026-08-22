import { Router } from "express";
import { TaskController } from "../../controllers/task.controller.js";
import { TaskService } from "../../services/task.service.js";
import { TaskRepository } from "../../repositories/task.repository.js";
import { authenticateUser } from "../../middlewares/authentication.middleware.js";
import { validateRequestParams,validateRequestBody, validateRequestQuery } from "../../middlewares/validate.middleware.js";
import { createTaskSchema, taskIdSchema, updateTaskSchema,updateTaskStatusSchema, getTasksQuerySchema } from "../../dtos/task.dto.js";
import { RoleName } from "../../types/role.type.js";
import { authorizeUser } from "../../middlewares/authorization.middleware.js";
import { submissionRouter } from "./submission.route.js";

import { TaskAssignmentController } from "../../controllers/taskAssignment.controller.js";
import { TaskAssignmentService } from "../../services/taskAssignment.service.js";
import { TaskAssignmentRepository } from "../../repositories/taskAssignment.repository.js";
import { UnassignmentReasonController } from "../../controllers/unassignmentReason.controller.js";
import { UnassignmentReasonService } from "../../services/unassignmentReason.service.js";
import { UnassignmentReasonRepository } from "../../repositories/unassignmentReason.repository.js";


const taskController = new TaskController(new TaskService(new TaskRepository(), new TaskAssignmentRepository()));

const taskAssignmentController = new TaskAssignmentController(new TaskAssignmentService(new TaskAssignmentRepository()));
const unassignmentReasonController =new UnassignmentReasonController( new UnassignmentReasonService( new UnassignmentReasonRepository()));
const taskRouter = Router();

taskRouter.get(
  "/",
  authenticateUser,
  authorizeUser(RoleName.ADMIN, RoleName.DEVELOPER),
  validateRequestQuery(getTasksQuerySchema),
  taskController.getTasksHandler.bind(taskController)
);

//un assignment reasons route

taskRouter.get(
    "/unassignment-reasons",
    authenticateUser,
    authorizeUser(RoleName.ADMIN),
    unassignmentReasonController.getAllReasonsHandler.bind(unassignmentReasonController)
);

taskRouter.get(
  "/:taskId",
  authenticateUser,
  validateRequestParams(taskIdSchema),
  taskController.getTaskByIdHandler.bind(taskController)
);

taskRouter.post(
  "/",
  authenticateUser,
  authorizeUser(RoleName.ADMIN),
  validateRequestBody(createTaskSchema),
  taskController.createTaskHandler.bind(taskController)
);

taskRouter.patch(
  "/:taskId/status",
  authenticateUser,
  authorizeUser(RoleName.ADMIN, RoleName.DEVELOPER),
  validateRequestParams(taskIdSchema),
  validateRequestBody(updateTaskStatusSchema),
  taskController.updateTaskStatusHandler.bind(taskController)
);

taskRouter.patch(
  "/:taskId",
  authenticateUser,
  authorizeUser(RoleName.ADMIN),
  validateRequestParams(taskIdSchema),
  validateRequestBody(updateTaskSchema),
  taskController.updateTaskHandler.bind(taskController)
);

taskRouter.use("/:taskId/submissions", submissionRouter);


// implemnet all the routes related to task assignment below that

taskRouter.get(
    "/:taskId/assignment-history",
    authenticateUser,
    authorizeUser(RoleName.ADMIN),
    validateRequestParams(taskIdSchema),
    taskAssignmentController.getAssignmentHistoryHandler.bind(taskAssignmentController)
);



export default taskRouter;