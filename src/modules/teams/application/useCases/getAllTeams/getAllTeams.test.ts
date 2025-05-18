import { GetAllTeams } from "./getAllTeams";
import { ITeamRepository } from "../../../domain/repositories/teamRepository";
import { Team } from "../../../domain/entities/team";

describe("GetAllTeams", () => {
  let useCase: GetAllTeams;
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
    useCase = new GetAllTeams(mockTeamRepository);
  });

  it("should return all teams", async () => {
    // Arrange
    const mockTeams = [
      Team.create({
        name: "Team 1",
        description: "Description 1",
      }),
      Team.create({
        name: "Team 2",
        description: "Description 2",
      }),
    ];

    mockTeamRepository.findAll.mockResolvedValue(mockTeams);

    // Act
    const result = await useCase.execute();

    // Assert
    expect(mockTeamRepository.findAll).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockTeams);
    expect(result).toHaveLength(2);
  });

  it("should return empty array when no teams exist", async () => {
    // Arrange
    mockTeamRepository.findAll.mockResolvedValue([]);

    // Act
    const result = await useCase.execute();

    // Assert
    expect(mockTeamRepository.findAll).toHaveBeenCalledTimes(1);
    expect(result).toHaveLength(0);
  });

  it("should handle repository errors", async () => {
    // Arrange
    const error = new Error("Database error");
    mockTeamRepository.findAll.mockRejectedValue(error);

    // Act & Assert
    await expect(useCase.execute()).rejects.toThrow("Database error");
    expect(mockTeamRepository.findAll).toHaveBeenCalledTimes(1);
  });
});
