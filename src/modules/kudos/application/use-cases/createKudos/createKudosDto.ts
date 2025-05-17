export interface CreateKudosDto {
  userId: number;
  createdByUserId: number;
  teamName: string;
  category: string;
  message: string;
}
