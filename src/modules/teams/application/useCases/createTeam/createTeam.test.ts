import { CreateTeam } from "./createTeam";
import { ITeamRepository } from "../../../domain/repositories/teamRepository";
import { Team } from "../../../domain/entities/team";
import { CreateTeamDto } from "./createTeamDto";

describe("CreateTeam", () => {
  let useCase: CreateTeam;
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
    useCase = new CreateTeam(mockTeamRepository);
  });

  it("should successfully create a new team", async () => {
    // Arrange
    const createTeamDto: CreateTeamDto = {
      name: "Test Team",
      description: "A test team",
    };

    mockTeamRepository.findByName.mockResolvedValue(null);
    mockTeamRepository.create.mockResolvedValue();

    // Act
    await useCase.execute(createTeamDto);

    // Assert
    expect(mockTeamRepository.findByName).toHaveBeenCalledWith(createTeamDto.name);
    expect(mockTeamRepository.create).toHaveBeenCalled();
  });

  it("should throw error when team name already exists", async () => {
    // Arrange
    const createTeamDto: CreateTeamDto = {
      name: "Existing Team",
      description: "An existing team",
    };

    const existingTeam = Team.create({
      name: createTeamDto.name,
      description: createTeamDto.description,
    });

    mockTeamRepository.findByName.mockResolvedValue(existingTeam);

    // Act & Assert
    await expect(useCase.execute(createTeamDto)).rejects.toThrow("Team with this name already exists");
    expect(mockTeamRepository.findByName).toHaveBeenCalledWith(createTeamDto.name);
    expect(mockTeamRepository.create).not.toHaveBeenCalled();
  });

  it("should handle repository errors", async () => {
    // Arrange
    const createTeamDto: CreateTeamDto = {
      name: "Test Team",
      description: "A test team",
    };

    const error = new Error("Database error");
    mockTeamRepository.findByName.mockRejectedValue(error);

    // Act & Assert
    await expect(useCase.execute(createTeamDto)).rejects.toThrow("Database error");
    expect(mockTeamRepository.findByName).toHaveBeenCalledWith(createTeamDto.name);
    expect(mockTeamRepository.create).not.toHaveBeenCalled();
  });
});
