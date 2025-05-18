import { UpdateTeam } from "./updateTeam";
import { ITeamRepository } from "../../../domain/repositories/teamRepository";
import { Team } from "../../../domain/entities/team";
import { UpdateTeamDto } from "./updateTeamDto";

describe("UpdateTeam", () => {
  let useCase: UpdateTeam;
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
    useCase = new UpdateTeam(mockTeamRepository);
  });

  it("should successfully update team", async () => {
    // Arrange
    const updateTeamDto: UpdateTeamDto = {
      id: 1,
      name: "Updated Team",
      description: "Updated description",
    };

    const existingTeam = Team.create({
      name: "Original Team",
      description: "Original description",
    });

    mockTeamRepository.findById.mockResolvedValue(existingTeam);
    mockTeamRepository.findByName.mockResolvedValue(null);
    mockTeamRepository.update.mockResolvedValue();

    // Act
    await useCase.execute(updateTeamDto);

    // Assert
    expect(mockTeamRepository.findById).toHaveBeenCalledWith(updateTeamDto.id);
    expect(mockTeamRepository.findByName).toHaveBeenCalledWith(updateTeamDto.name);
    expect(mockTeamRepository.update).toHaveBeenCalled();
  });

  it("should throw error when team not found", async () => {
    // Arrange
    const updateTeamDto: UpdateTeamDto = {
      id: 999,
      name: "Updated Team",
      description: "Updated description",
    };

    mockTeamRepository.findById.mockResolvedValue(null);

    // Act & Assert
    await expect(useCase.execute(updateTeamDto)).rejects.toThrow("Team not found");
    expect(mockTeamRepository.findById).toHaveBeenCalledWith(updateTeamDto.id);
    expect(mockTeamRepository.findByName).not.toHaveBeenCalled();
    expect(mockTeamRepository.update).not.toHaveBeenCalled();
  });

  it("should throw error when team name already exists", async () => {
    // Arrange
    const updateTeamDto: UpdateTeamDto = {
      id: 1,
      name: "Existing Team",
      description: "Updated description",
    };

    const existingTeam = Team.create({
      name: "Original Team",
      description: "Original description",
    });

    const teamWithSameName = Team.create({
      name: "Existing Team",
      description: "Some description",
    });

    mockTeamRepository.findById.mockResolvedValue(existingTeam);
    mockTeamRepository.findByName.mockResolvedValue(teamWithSameName);

    // Act & Assert
    await expect(useCase.execute(updateTeamDto)).rejects.toThrow("Team with this name already exists");
    expect(mockTeamRepository.findById).toHaveBeenCalledWith(updateTeamDto.id);
    expect(mockTeamRepository.findByName).toHaveBeenCalledWith(updateTeamDto.name);
    expect(mockTeamRepository.update).not.toHaveBeenCalled();
  });

  it("should handle repository errors", async () => {
    // Arrange
    const updateTeamDto: UpdateTeamDto = {
      id: 1,
      name: "Updated Team",
      description: "Updated description",
    };

    const error = new Error("Database error");
    mockTeamRepository.findById.mockRejectedValue(error);

    // Act & Assert
    await expect(useCase.execute(updateTeamDto)).rejects.toThrow("Database error");
    expect(mockTeamRepository.findById).toHaveBeenCalledWith(updateTeamDto.id);
    expect(mockTeamRepository.findByName).not.toHaveBeenCalled();
    expect(mockTeamRepository.update).not.toHaveBeenCalled();
  });
});
