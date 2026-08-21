import { Router } from "express";

import { ProjectMemberController } from "../../controllers/projectMember.controller.js";
import { ProjectMemberService } from "../../services/projectMember.service.js";
import { ProjectMemberRepository } from "../../repositories/projectMember.repository.js";
import { ProjectController } from "../../controllers/project.controller.js";
import { ProjectService } from "../../services/project.service.js";
import { ProjectRepository } from "../../repositories/project.repository.js";
import { UserRepository } from "../../repositories/user.repository.js";
import { validateRequestBody, validateRequestParams  } from "../../middlewares/validate.middleware.js";
import { authenticateUser } from "../../middlewares/authentication.middleware.js";
import { authorizeUser } from "../../middlewares/authorization.middleware.js";
import { projectIdParamSchema, addProjectMemberSchema , projectMemberParamsSchema} from "../../dtos/projectMember.dto.js";
import { RoleName } from "../../types/role.type.js";
import { updateProjectSchema ,updateProjectStatusSchema} from "../../dtos/project.dto.js";

const projectMemberController = new ProjectMemberController(
    new ProjectMemberService(
        new ProjectMemberRepository(),
        new ProjectRepository(),
        new UserRepository()
    )
);

const projectController = new ProjectController(
    new ProjectService(
        new ProjectRepository(), 
        new ProjectMemberRepository()
    )
);

const projectRouter = Router();

projectRouter.post(
    "/",
    authenticateUser,
    authorizeUser(RoleName.ADMIN),
    projectController.createProjectHandler.bind(projectController)
);

projectRouter.get(
  "/",
  authenticateUser,
  authorizeUser(RoleName.ADMIN),
  projectController.getAllProjectsHandler.bind(projectController)
);

projectRouter.get(
  "/:id",
  authenticateUser,
  projectController.getProjectByIdHandler.bind(projectController)
);

projectRouter.patch(
  "/:id",
  authenticateUser,
  authorizeUser(RoleName.ADMIN),
  validateRequestBody(updateProjectSchema),
  projectController.updateProjectHandler.bind(projectController)
);

projectRouter.post(
    "/:projectId/members",
    authenticateUser,
    authorizeUser(RoleName.ADMIN),
    validateRequestParams(projectIdParamSchema),
    validateRequestBody(addProjectMemberSchema),
    projectMemberController.addProjectMemberHandler.bind(projectMemberController)
);
projectRouter.patch(
  "/:id/status",
  authenticateUser,
  authorizeUser(RoleName.ADMIN),
  validateRequestBody(updateProjectStatusSchema),
  projectController.updateProjectStatusHandler.bind(projectController)
);

projectRouter.get(
    "/:projectId/members",
    authenticateUser,
    validateRequestParams(projectIdParamSchema),
    projectMemberController.getProjectMembersHandler.bind(projectMemberController)
);

projectRouter.delete(
    "/:projectId/members/:userId",
    authenticateUser,
    authorizeUser(RoleName.ADMIN),
    validateRequestParams(projectMemberParamsSchema),
    projectMemberController.removeProjectMemberHandler.bind(projectMemberController)
);

export default projectRouter;

