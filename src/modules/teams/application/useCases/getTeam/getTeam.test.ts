import { GetTeam } from "./getTeam";
import { ITeamRepository } from "../../../domain/repositories/teamRepository";
import { Team } from "../../../domain/entities/team";

describe("GetTeam", () => {
  let useCase: GetTeam;
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
    useCase = new GetTeam(mockTeamRepository);
  });

  it("should return team when found", async () => {
    // Arrange
    const mockTeam = Team.create({
      name: "Test Team",
      description: "A test team",
    });

    mockTeamRepository.findById.mockResolvedValue(mockTeam);

    // Act
    const result = await useCase.execute(1);

    // Assert
    expect(mockTeamRepository.findById).toHaveBeenCalledWith(1);
    expect(result).toEqual(mockTeam);
  });

  it("should throw error when team not found", async () => {
    // Arrange
    mockTeamRepository.findById.mockResolvedValue(null);

    // Act & Assert
    await expect(useCase.execute(999)).rejects.toThrow("Team not found");
    expect(mockTeamRepository.findById).toHaveBeenCalledWith(999);
  });

  it("should handle repository errors", async () => {
    // Arrange
    const error = new Error("Database error");
    mockTeamRepository.findById.mockRejectedValue(error);

    // Act & Assert
    await expect(useCase.execute(1)).rejects.toThrow("Database error");
    expect(mockTeamRepository.findById).toHaveBeenCalledWith(1);
  });
});
