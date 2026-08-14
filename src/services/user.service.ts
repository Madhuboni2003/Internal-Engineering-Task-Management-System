import bcrypt from "bcrypt";
import { User, Prisma } from "../../generated/prisma/client.js";
import { IUserRepository } from "../repositories/user.repository.js";
import { IRoleService } from "./role.service.js";
import { CreateUserDto } from "../dtos/user.dto.js";
import { ConflictError } from "../utils/errors/app.error.js";

const SALT_ROUNDS = 10;
const DEVELOPER_ROLE_NAME = "Developer";

export interface IUserService {
    createUser(data: CreateUserDto): Promise<User>;
}

export class UserService implements IUserService {
    private readonly userRepository: IUserRepository;
    private readonly roleService: IRoleService;

    constructor(userRepository: IUserRepository, roleService: IRoleService) {
        this.userRepository = userRepository;
        this.roleService = roleService;
    }

    async createUser(data: CreateUserDto): Promise<User> {
        const role = await this.roleService.findRoleByName(DEVELOPER_ROLE_NAME);

        const hashedPassword = await bcrypt.hash(data.password, SALT_ROUNDS);

        try {
            const user = await this.userRepository.create({
                fullName: data.fullName,
                email: data.email,
                passwordHash: hashedPassword,
                role: {
                    connect: { id: role!.id }
                }
            });

            const { passwordHash, ...userWithoutPassword } = user;
            return userWithoutPassword as User;
        } catch (error) {
            if (error instanceof Prisma.PrismaClientKnownRequestError && error.code == 'P2002') {
                throw new ConflictError('A user with this email already exists', { fields: error.meta?.target });
            }

            throw error;
        }
    }
}