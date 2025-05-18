import { GetMembersUseCase } from "./getMembers";
import { IAdminRepository } from "../../../repositories/adminRepository";
import { MemberDto } from "./getMembersDto";
import { User } from "../../../../users/domain/entities/user";
import { ActivationStatus } from "../../../../users/domain/interfaces/interfaces";

describe("GetMembersUseCase", () => {
  let useCase: GetMembersUseCase;
  let mockAdminRepository: jest.Mocked<IAdminRepository>;

  beforeEach(() => {
    mockAdminRepository = {
      getMembers: jest.fn(),
      updateMemberRole: jest.fn(),
      deleteMember: jest.fn(),
      getPendingTeamLeadRequests: jest.fn(),
      handleTeamLeadSignup: jest.fn(),
    };
    useCase = new GetMembersUseCase(mockAdminRepository);
  });

  it("should return all members mapped to DTOs", async () => {
    // Arrange
    const mockMembers = [
      new User({
        id: 1,
        email: "member1@example.com",
        password: "hashedPassword1",
        name: "Member 1",
        role: "user",
        isActive: true,
        activationStatus: ActivationStatus.APPROVED,
      }),
      new User({
        id: 2,
        email: "member2@example.com",
        password: "hashedPassword2",
        name: "Member 2",
        role: "user",
        isActive: true,
        activationStatus: ActivationStatus.APPROVED,
      }),
    ];

    mockAdminRepository.getMembers.mockResolvedValue(mockMembers);

    // Act
    const result = await useCase.execute();

    // Assert
    expect(mockAdminRepository.getMembers).toHaveBeenCalledTimes(1);
    expect(result).toHaveLength(2);
    expect(result[0]).toEqual({
      id: 1,
      email: "member1@example.com",
      name: "Member 1",
      role: "user",
      imageUrl: undefined,
      activationStatus: ActivationStatus.APPROVED,
      isActive: true,
    });
    expect(result[1]).toEqual({
      id: 2,
      email: "member2@example.com",
      name: "Member 2",
      role: "user",
      imageUrl: undefined,
      activationStatus: ActivationStatus.APPROVED,
      isActive: true,
    });
  });

  it("should return empty array when no members exist", async () => {
    // Arrange
    mockAdminRepository.getMembers.mockResolvedValue([]);

    // Act
    const result = await useCase.execute();

    // Assert
    expect(mockAdminRepository.getMembers).toHaveBeenCalledTimes(1);
    expect(result).toHaveLength(0);
  });

  it("should handle repository errors", async () => {
    // Arrange
    const error = new Error("Database error");
    mockAdminRepository.getMembers.mockRejectedValue(error);

    // Act & Assert
    await expect(useCase.execute()).rejects.toThrow("Database error");
    expect(mockAdminRepository.getMembers).toHaveBeenCalledTimes(1);
  });
});
