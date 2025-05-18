import { HandleTeamLeadSignupUseCase } from "./handleTeamLeadSignup";
import { AdminRepositoryImpl } from "../../../infrastructure/repositories/adminRepositoryImpl";

export class HandleTeamLeadSignupFactory {
  static create(): HandleTeamLeadSignupUseCase {
    const adminRepository = new AdminRepositoryImpl();
    return new HandleTeamLeadSignupUseCase(adminRepository);
  }
}
