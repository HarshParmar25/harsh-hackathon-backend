import { UpdateMemberRoleUseCase } from "./updateMemberRole";
import { IAdminRepository } from "../../../repositories/adminRepository";
import { UpdateMemberRoleDto } from "./updateMemberRoleDto";
import { User } from "../../../../users/domain/entities/user";
import { ActivationStatus, UserRole } from "../../../../users/domain/interfaces/interfaces";

describe("UpdateMemberRoleUseCase", () => {
  let useCase: UpdateMemberRoleUseCase;
  let mockAdminRepository: jest.Mocked<IAdminRepository>;

  beforeEach(() => {
    mockAdminRepository = {
      getMembers: jest.fn(),
      updateMemberRole: jest.fn(),
      deleteMember: jest.fn(),
      getPendingTeamLeadRequests: jest.fn(),
      handleTeamLeadSignup: jest.fn(),
    };
    useCase = new UpdateMemberRoleUseCase(mockAdminRepository);
  });

  it("should successfully update member role", async () => {
    // Arrange
    const updateMemberRoleDto: UpdateMemberRoleDto = {
      memberId: 1,
      role: UserRole.ADMIN,
    };

    const updatedMember = new User({
      id: 1,
      email: "member@example.com",
      password: "hashedPassword",
      name: "Member",
      role: UserRole.ADMIN,
      isActive: true,
      activationStatus: ActivationStatus.APPROVED,
    });

    mockAdminRepository.updateMemberRole.mockResolvedValue(true);

    // Act
    const result = await useCase.execute(updateMemberRoleDto);

    // Assert
    expect(mockAdminRepository.updateMemberRole).toHaveBeenCalledWith(
      updateMemberRoleDto.memberId,
      updateMemberRoleDto.role
    );
    expect(result).toEqual({
      success: true,
      message: "Member role updated successfully",
    });
  });

  it("should handle repository errors", async () => {
    // Arrange
    const updateMemberRoleDto: UpdateMemberRoleDto = {
      memberId: 1,
      role: UserRole.ADMIN,
    };

    const error = new Error("Database error");
    mockAdminRepository.updateMemberRole.mockRejectedValue(error);

    // Act & Assert
    await expect(useCase.execute(updateMemberRoleDto)).rejects.toThrow("Database error");
    expect(mockAdminRepository.updateMemberRole).toHaveBeenCalledWith(
      updateMemberRoleDto.memberId,
      updateMemberRoleDto.role
    );
  });
});
