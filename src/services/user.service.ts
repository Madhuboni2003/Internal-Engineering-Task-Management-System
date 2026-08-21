import { Prisma } from "../../generated/prisma/client.js";
import { CreateUserDto, UpdateUserDto } from "../dtos/user.dto.js";
import { IUserRepository } from "../repositories/user.repository.js";
import { SafeUser } from "../types/auth.type.js";
import { ConflictError, NotfoundError, UnauthorizedError } from "../utils/errors/app.error.js";
import { hashPassword } from "../utils/helpers/password.helper.js";
import { SafeUserWithRole } from "../types/auth.type.js";

export interface IUserService {
  createUser(data: CreateUserDto): Promise<SafeUser>;
  updateUser(loggedInUserId: bigint, targetUserId: bigint, data: UpdateUserDto): Promise<SafeUser>;
  getAllUsers(): Promise<SafeUser[]>;
  findUserById(id: bigint): Promise<SafeUserWithRole>;
}

export class UserService implements IUserService {
  private readonly userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  async createUser(data: CreateUserDto): Promise<SafeUser> {
    try {
      const existingUser = await this.userRepository.findByEmail(data.email);
      if (existingUser) {
        throw new ConflictError("Email already exists");
      }
      const passwordHash = await hashPassword(data.password);
      return await this.userRepository.create(data, passwordHash);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
        throw new ConflictError("A record with this value already exists");
      }
      throw error;
    }
  }

 async updateUser(loggedInUserId: bigint, targetUserId: bigint, data: UpdateUserDto): Promise<SafeUser> {
    const targetUser = await this.userRepository.findById(targetUserId);

    if (!targetUser) {
      throw new NotfoundError("User not found");
    }

    if (loggedInUserId !== targetUserId) {
      throw new UnauthorizedError("You are not allowed to update this profile");
    }

    const updateData: Prisma.UserUpdateInput = {
      ...(data.fullName != undefined && { fullName: data.fullName}),
      ...(data.email != undefined && { email: data.email }),
      ...(data.password != undefined && { passwordHash: await hashPassword(data.password)})
    };

    try {
      return await this.userRepository.updateUser(targetUserId, updateData);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
        throw new ConflictError("Email already in use");
      }
      throw error;
    }
  }

  async getAllUsers(): Promise<SafeUser[]> {
    return await this.userRepository.getAllUsers();
  }

  async findUserById(id: bigint): Promise<SafeUserWithRole> {
    const user = await this.userRepository.getUserDetails(id);

    if (!user) {
      throw new NotfoundError("User not found");
    }

    return user;
  }
}