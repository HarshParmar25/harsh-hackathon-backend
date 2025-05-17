import { ProfileRepositoryImpl } from "../../../infrastructure/repositories/profileRepositoryImpl";
import { GetProfileUseCase } from "./getProfile";

export class GetProfileFactory {
  static create() {
    const profileRepository = new ProfileRepositoryImpl();
    return new GetProfileUseCase(profileRepository);
  }
}
