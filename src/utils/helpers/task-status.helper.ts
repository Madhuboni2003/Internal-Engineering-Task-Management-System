import { BadRequestError, ForbiddenError } from "../errors/app.error.js";
import { RoleName } from "../../types/role.type.js";
import { TaskStatus } from "../../../generated/prisma/client.js";


export function validateStatusTransition( currentStatus: TaskStatus,nextStatus: TaskStatus,role: RoleName): void {
  if (role === RoleName.DEVELOPER) {
    validateDeveloperTransition(currentStatus, nextStatus);
    return;
  }

  if (role === RoleName.ADMIN) {
    validateAdminTransition(currentStatus, nextStatus);
    return;
  }

  throw new ForbiddenError("You are not allowed to move the task status");
}

function validateDeveloperTransition(currentStatus: TaskStatus,nextStatus: TaskStatus): void {
  const canStartTask: boolean = currentStatus == TaskStatus.TODO && nextStatus == TaskStatus.IN_PROGRESS;

  const canResumeReopenedTask: boolean = currentStatus == TaskStatus.REOPENED && nextStatus == TaskStatus.IN_PROGRESS;

  if(!canStartTask || !canResumeReopenedTask) {
    throw new BadRequestError(`Developer can not move task from ${currentStatus} to ${nextStatus}`);
  }

  return;
}

function validateAdminTransition(currentStatus: TaskStatus,nextStatus: TaskStatus): void {
  const canCompleteTask: boolean = currentStatus == TaskStatus.READY_FOR_REVIEW && nextStatus == TaskStatus.COMPLETED;

  const canRequestChangeTask: boolean = currentStatus == TaskStatus.READY_FOR_REVIEW && nextStatus == TaskStatus.REOPENED;

  if(!canCompleteTask || !canRequestChangeTask) {
    throw new BadRequestError(`Admin can not move task from ${currentStatus} to ${nextStatus}`);
  }

  return;
}