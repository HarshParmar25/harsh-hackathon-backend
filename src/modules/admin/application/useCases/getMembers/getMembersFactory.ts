import { GetMembersUseCase } from "./getMembers";
import { AdminRepositoryImpl } from "../../../infrastructure/repositories/adminRepositoryImpl";

export class GetMembersFactory {
  static create(): GetMembersUseCase {
    const adminRepository = new AdminRepositoryImpl();
    return new GetMembersUseCase(adminRepository);
  }
}
