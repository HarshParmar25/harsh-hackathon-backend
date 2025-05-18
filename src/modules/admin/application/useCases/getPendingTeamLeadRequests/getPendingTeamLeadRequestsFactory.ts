import { GetPendingTeamLeadRequestsUseCase } from "./getPendingTeamLeadRequests";
import { AdminRepositoryImpl } from "../../../infrastructure/repositories/adminRepositoryImpl";

export class GetPendingTeamLeadRequestsFactory {
  static create(): GetPendingTeamLeadRequestsUseCase {
    const adminRepository = new AdminRepositoryImpl();
    return new GetPendingTeamLeadRequestsUseCase(adminRepository);
  }
}
