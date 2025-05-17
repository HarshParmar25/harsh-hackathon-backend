import { Profile } from "../entities/profile";

export interface IProfileRepository {
  findByUserId(userId: number): Promise<Profile | null>;
}
