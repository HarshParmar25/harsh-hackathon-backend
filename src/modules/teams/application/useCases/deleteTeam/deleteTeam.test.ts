import { DeleteTeam } from "./deleteTeam";
import { ITeamRepository } from "../../../domain/repositories/teamRepository";
import { Team } from "../../../domain/entities/team";

describe("DeleteTeam", () => {
  let useCase: DeleteTeam;
  let mockTeamRepository: jest.Mocked<ITeamRepository>;

  beforeEach(() => {
    mockTeamRepository = {
      findByName: jest.fn(),
      create: jest.fn(),
      findById: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      findAll: jest.fn(),
    };
    useCase = new DeleteTeam(mockTeamRepository);
  });

  it("should successfully delete team", async () => {
    // Arrange
    const mockTeam = Team.create({
      name: "Test Team",
      description: "A test team",
    });

    mockTeamRepository.findById.mockResolvedValue(mockTeam);
    mockTeamRepository.delete.mockResolvedValue();

    // Act
    await useCase.execute(1);

    // Assert
    expect(mockTeamRepository.findById).toHaveBeenCalledWith(1);
    expect(mockTeamRepository.delete).toHaveBeenCalledWith(1);
  });

  it("should throw error when team not found", async () => {
    // Arrange
    mockTeamRepository.findById.mockResolvedValue(null);

    // Act & Assert
    await expect(useCase.execute(999)).rejects.toThrow("Team not found");
    expect(mockTeamRepository.findById).toHaveBeenCalledWith(999);
    expect(mockTeamRepository.delete).not.toHaveBeenCalled();
  });

  it("should handle repository errors", async () => {
    // Arrange
    const error = new Error("Database error");
    mockTeamRepository.findById.mockRejectedValue(error);

    // Act & Assert
    await expect(useCase.execute(1)).rejects.toThrow("Database error");
    expect(mockTeamRepository.findById).toHaveBeenCalledWith(1);
    expect(mockTeamRepository.delete).not.toHaveBeenCalled();
  });
});
