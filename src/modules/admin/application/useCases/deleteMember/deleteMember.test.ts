import { DeleteMemberUseCase } from "./deleteMember";
import { IAdminRepository } from "../../../repositories/adminRepository";
import { DeleteMemberDto } from "./deleteMemberDto";

describe("DeleteMemberUseCase", () => {
  let useCase: DeleteMemberUseCase;
  let mockAdminRepository: jest.Mocked<IAdminRepository>;

  beforeEach(() => {
    mockAdminRepository = {
      getMembers: jest.fn(),
      updateMemberRole: jest.fn(),
      deleteMember: jest.fn(),
      getPendingTeamLeadRequests: jest.fn(),
      handleTeamLeadSignup: jest.fn(),
    };
    useCase = new DeleteMemberUseCase(mockAdminRepository);
  });

  it("should successfully delete member", async () => {
    // Arrange
    const deleteMemberDto: DeleteMemberDto = {
      memberId: 1,
    };

    mockAdminRepository.deleteMember.mockResolvedValue(true);

    // Act
    const result = await useCase.execute(deleteMemberDto);

    // Assert
    expect(mockAdminRepository.deleteMember).toHaveBeenCalledWith(deleteMemberDto.memberId);
    expect(result).toEqual({
      success: true,
      message: "Member deleted successfully",
    });
  });

  it("should handle repository errors", async () => {
    // Arrange
    const deleteMemberDto: DeleteMemberDto = {
      memberId: 1,
    };

    const error = new Error("Database error");
    mockAdminRepository.deleteMember.mockRejectedValue(error);

    // Act & Assert
    await expect(useCase.execute(deleteMemberDto)).rejects.toThrow("Database error");
    expect(mockAdminRepository.deleteMember).toHaveBeenCalledWith(deleteMemberDto.memberId);
  });
});
