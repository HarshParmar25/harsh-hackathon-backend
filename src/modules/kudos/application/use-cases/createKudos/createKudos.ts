import { IKudosRepository, Kudos } from "../../../repositories/kudosRepository";
import { CreateKudosDto } from "./createKudosDto";
import { BasecampService } from "../../../../../shared/services/basecampService";
import { IUserRepository, User } from "../../../repositories/userRepository";

export class CreateKudosUseCase {
  constructor(private readonly kudosRepository: IKudosRepository, private readonly userRepository: IUserRepository) {}

  async execute(data: CreateKudosDto): Promise<Kudos> {
    const kudos = await this.kudosRepository.create(data);
    const users = await this.userRepository.findByIds([data.userId, data.createdByUserId]);

    const creator = users.find((user) => user.id === data.createdByUserId);
    const receiver = users.find((user) => user.id === data.userId);

    if (creator && receiver) {
      await this.sendNotification(kudos, creator, receiver);
    }

    return kudos;
  }

  private async sendNotification(kudos: Kudos, creator: User, receiver: User) {
    const name = "Denish";
    const name2 = "Parth";
    const notificationContent = `<b>🚀 Captain Harsh's Kudos Station!</b><br>
      <b>From:</b> ${name} <span style="color: #4CAF50;">✨</span><br>
      <b>To:</b> ${name2} <span style="color: #2196F3;">🌟</span><br>
      <b>Category:</b> ${kudos.category} <span style="color: #FF9800;">🏆</span><br>
      <b>Message:</b> ${kudos.message}<br>
      <b>Team:</b> ${kudos.teamName} <span style="color: #9C27B0;">👥</span><br>
      <i>Keep spreading the awesome vibes! 🌈</i>`;

    await BasecampService.sendNotification(notificationContent);
  }
}
