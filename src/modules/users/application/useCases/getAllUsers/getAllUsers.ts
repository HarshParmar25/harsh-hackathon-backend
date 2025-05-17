import { IUserRepository } from "../../../repositories/userRepository";
import { GetAllUsersResponseMapper } from "./getAllUsersResponseMapper";
import { GetAllUsersDto } from "./getAllUsersDto";

export class GetAllUsersUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(): Promise<GetAllUsersDto[]> {
    const users = await this.userRepository.findAll();
    return GetAllUsersResponseMapper.toDto(users);
  }
}
