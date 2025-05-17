import { IProfileRepository } from "../../../domain/repositories/profileRepository";
import { Profile } from "../../../domain/entities/profile";

export class GetProfileUseCase {
  constructor(private readonly profileRepository: IProfileRepository) {}

  async execute(userId: number): Promise<Profile | null> {
    return this.profileRepository.findByUserId(userId);
  }
}
