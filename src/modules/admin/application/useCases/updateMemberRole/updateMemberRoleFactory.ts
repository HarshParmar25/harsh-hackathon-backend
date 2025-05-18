import { UpdateMemberRoleUseCase } from "./updateMemberRole";
import { AdminRepositoryImpl } from "../../../infrastructure/repositories/adminRepositoryImpl";

export class UpdateMemberRoleFactory {
  static create(): UpdateMemberRoleUseCase {
    const adminRepository = new AdminRepositoryImpl();
    return new UpdateMemberRoleUseCase(adminRepository);
  }
}
