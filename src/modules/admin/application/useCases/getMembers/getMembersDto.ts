export interface MemberDto {
  id: number;
  name: string;
  email: string;
  role: string;
  imageUrl?: string;
  isActive: boolean;
  activationStatus: string;
}
