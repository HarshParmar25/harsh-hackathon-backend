import { GetPendingTeamLeadRequestsUseCase } from "./getPendingTeamLeadRequests";
import { IAdminRepository } from "../../../repositories/adminRepository";
import { User } from "../../../../users/domain/entities/user";
import { ActivationStatus, UserRole } from "../../../../users/domain/interfaces/interfaces";

describe("GetPendingTeamLeadRequestsUseCase", () => {
  let useCase: GetPendingTeamLeadRequestsUseCase;
  let mockAdminRepository: jest.Mocked<IAdminRepository>;

  beforeEach(() => {
    mockAdminRepository = {
      getMembers: jest.fn(),
      updateMemberRole: jest.fn(),
      deleteMember: jest.fn(),
      getPendingTeamLeadRequests: jest.fn(),
      handleTeamLeadSignup: jest.fn(),
    };
    useCase = new GetPendingTeamLeadRequestsUseCase(mockAdminRepository);
  });

  it("should return all pending team lead requests mapped to DTOs", async () => {
    // Arrange
    const mockPendingRequests = [
      new User({
        id: 1,
        email: "teamlead1@example.com",
        password: "hashedPassword1",
        name: "Team Lead 1",
        role: UserRole.TEAM_LEAD,
        isActive: false,
        activationStatus: ActivationStatus.PENDING,
      }),
      new User({
        id: 2,
        email: "teamlead2@example.com",
        password: "hashedPassword2",
        name: "Team Lead 2",
        role: UserRole.TEAM_LEAD,
        isActive: false,
        activationStatus: ActivationStatus.PENDING,
      }),
    ];

    mockAdminRepository.getPendingTeamLeadRequests.mockResolvedValue(mockPendingRequests);

    // Act
    const result = await useCase.execute();

    // Assert
    expect(mockAdminRepository.getPendingTeamLeadRequests).toHaveBeenCalledTimes(1);
    expect(result).toHaveLength(2);
    expect(result[0]).toEqual({
      id: 1,
      email: "teamlead1@example.com",
      name: "Team Lead 1",
      role: UserRole.TEAM_LEAD,
      imageUrl: undefined,
      activationStatus: ActivationStatus.PENDING,
      isActive: false,
    });
    expect(result[1]).toEqual({
      id: 2,
      email: "teamlead2@example.com",
      name: "Team Lead 2",
      role: UserRole.TEAM_LEAD,
      imageUrl: undefined,
      activationStatus: ActivationStatus.PENDING,
      isActive: false,
    });
  });

  it("should return empty array when no pending requests exist", async () => {
    // Arrange
    mockAdminRepository.getPendingTeamLeadRequests.mockResolvedValue([]);

    // Act
    const result = await useCase.execute();

    // Assert
    expect(mockAdminRepository.getPendingTeamLeadRequests).toHaveBeenCalledTimes(1);
    expect(result).toHaveLength(0);
  });

  it("should handle repository errors", async () => {
    // Arrange
    const error = new Error("Database error");
    mockAdminRepository.getPendingTeamLeadRequests.mockRejectedValue(error);

    // Act & Assert
    await expect(useCase.execute()).rejects.toThrow("Database error");
    expect(mockAdminRepository.getPendingTeamLeadRequests).toHaveBeenCalledTimes(1);
  });
});
