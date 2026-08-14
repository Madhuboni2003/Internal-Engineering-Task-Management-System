import { Router } from "express";
import { UserController } from "../../controllers/user.controller.js";
import { UserService } from "../../services/user.service.js";
import { UserRepository } from "../../repositories/user.repository.js";
import { RoleService } from "../../services/role.service.js";
import { RoleRepository } from "../../repositories/role.repository.js";
import { validateBody } from "../../middlewares/validate.middleware.js";
import { createUserSchema } from "../../dtos/user.dto.js";

const userController = new UserController(
    new UserService(
        new UserRepository(),
        new RoleService(new RoleRepository())
    )
);

const userRouter = Router();

userRouter.post('/', validateBody(createUserSchema), userController.createUserHandler);

export default userRouter;