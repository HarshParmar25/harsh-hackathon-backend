import { DeleteMemberUseCase } from "./deleteMember";
import { AdminRepositoryImpl } from "../../../infrastructure/repositories/adminRepositoryImpl";

export class DeleteMemberFactory {
  static create(): DeleteMemberUseCase {
    const adminRepository = new AdminRepositoryImpl();
    return new DeleteMemberUseCase(adminRepository);
  }
}
