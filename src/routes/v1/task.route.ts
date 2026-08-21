import { Router } from "express";
import { TaskController } from "../../controllers/task.controller.js";
import { TaskService } from "../../services/task.service.js";
import { TaskRepository } from "../../repositories/task.repository.js";
import { authenticateUser } from "../../middlewares/authentication.middleware.js";
import { validateRequestParams,validateRequestBody, validateRequestQuery } from "../../middlewares/validate.middleware.js";
import { createTaskSchema, taskIdSchema, updateTaskSchema, getTasksQuerySchema } from "../../dtos/task.dto.js";
import { RoleName } from "../../types/role.type.js";
import { authorizeUser } from "../../middlewares/authorization.middleware.js";
import { TaskAssignmentController } from "../../controllers/taskAssignment.controller.js";
import { TaskAssignmentService } from "../../services/taskAssignment.service.js";
import { TaskAssignmentRepository } from "../../repositories/taskAssignment.repository.js";
import { commentRouter } from "./comment.route.js";

const taskController = new TaskController(new TaskService(new TaskRepository()));

const taskAssignmentController = new TaskAssignmentController(new TaskAssignmentService(new TaskAssignmentRepository()));

const taskRouter = Router();

taskRouter.get(
  "/",
  authenticateUser,
  authorizeUser(RoleName.ADMIN, RoleName.DEVELOPER),
  validateRequestQuery(getTasksQuerySchema),
  taskController.getTasksHandler.bind(taskController)
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
  "/:taskId",
  authenticateUser,
  authorizeUser(RoleName.ADMIN),
  validateRequestParams(taskIdSchema),
  validateRequestBody(updateTaskSchema),
  taskController.updateTaskHandler.bind(taskController)
);

taskRouter.use("/:taskId", commentRouter);

// implemnet all the routes related to task assignment below that

export default taskRouter;