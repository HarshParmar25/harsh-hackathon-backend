import { GetAllKudosUseCase } from "./getAllKudos";
import { IKudosRepository, Kudos } from "../../../repositories/kudosRepository";

describe("GetAllKudosUseCase", () => {
  let useCase: GetAllKudosUseCase;
  let mockKudosRepository: jest.Mocked<IKudosRepository>;

  beforeEach(() => {
    mockKudosRepository = {
      create: jest.fn(),
      findAllWithUsers: jest.fn(),
      findById: jest.fn(),
      findByUserId: jest.fn(),
      findByCreatedByUserId: jest.fn(),
      softDelete: jest.fn(),
    };
    useCase = new GetAllKudosUseCase(mockKudosRepository);
  });

  it("should return all kudos with user information", async () => {
    // Arrange
    const mockKudos: Kudos[] = [
      {
        id: 1,
        userId: 1,
        createdByUserId: 2,
        teamName: "Engineering",
        category: "Teamwork",
        message: "Great collaboration!",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        userId: 3,
        createdByUserId: 1,
        teamName: "Design",
        category: "Innovation",
        message: "Amazing design work!",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    mockKudosRepository.findAllWithUsers.mockResolvedValue(
      mockKudos.map((kudos) => ({
        ...kudos,
        createdByUserId: kudos.createdByUserId || 0,
      }))
    );

    // Act
    const result = await useCase.execute();

    // Assert
    expect(mockKudosRepository.findAllWithUsers).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockKudos);
    expect(result).toHaveLength(2);
  });

  it("should return empty array when no kudos exist", async () => {
    // Arrange
    mockKudosRepository.findAllWithUsers.mockResolvedValue([]);

    // Act
    const result = await useCase.execute();

    // Assert
    expect(mockKudosRepository.findAllWithUsers).toHaveBeenCalledTimes(1);
    expect(result).toHaveLength(0);
  });

  it("should handle repository errors", async () => {
    // Arrange
    const error = new Error("Database error");
    mockKudosRepository.findAllWithUsers.mockRejectedValue(error);

    // Act & Assert
    await expect(useCase.execute()).rejects.toThrow("Database error");
    expect(mockKudosRepository.findAllWithUsers).toHaveBeenCalledTimes(1);
  });
});
