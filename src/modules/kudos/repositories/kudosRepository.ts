import { CreateKudosDto } from "../application/use-cases/createKudos/createKudosDto";

export interface Kudos {
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

export interface IKudosRepository {
  create(data: CreateKudosDto): Promise<Kudos>;
  findAllWithUsers(): Promise<Kudos[]>;
  findById(id: number): Promise<Kudos | null>;
  findByUserId(userId: number): Promise<Kudos[]>;
  findByCreatedByUserId(createdByUserId: number): Promise<Kudos[]>;
  softDelete(id: number): Promise<void>;
}
