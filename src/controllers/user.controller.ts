import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { IUserService } from "../services/user.service.js";
import { CreateUserDto } from "../dtos/user.dto.js";
import { sendSuccess } from "../utils/helpers/response.helper.js";

export class UserController {
    private readonly userService: IUserService;

    constructor(userService: IUserService) {
        this.userService = userService;
    }

    createUserHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const data = req.body as CreateUserDto;

            const user = await this.userService.createUser(data);

            sendSuccess(res, user, StatusCodes.CREATED, 'User created successfully');
        } catch (error) {
            next(error);
        }
    };
}