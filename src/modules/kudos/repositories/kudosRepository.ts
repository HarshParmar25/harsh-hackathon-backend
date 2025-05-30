import { CreateKudosDto } from "../application/use-cases/createKudos/createKudosDto";

export interface KudosWithUsers {
  id: number;
  userId: number;
  createdByUserId: number;
  teamName: string;
  category: string;
  message: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
  receiver?: {
    id: number;
    name: string;
    imageUrl: string;
  };
  creator?: {
    id: number;
    name: string;
    imageUrl: string;
  };
}

export interface Kudos {
  id: number;
  userId: number;
  createdByUserId?: number;
  creatorName?: string;
  creatorImageUrl?: string;
  receiverName?: string;
  receiverImageUrl?: string;
  teamName: string;
  category: string;
  message: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}

export interface IKudosRepository {
  create(data: CreateKudosDto): Promise<Kudos>;
  findAllWithUsers(): Promise<KudosWithUsers[]>;
  findByUserIdWithUsers(userId: number): Promise<KudosWithUsers[]>;
}
