import { CreateKudosUseCase } from "./createKudos";
import { IKudosRepository, Kudos } from "../../../repositories/kudosRepository";
import { CreateKudosDto } from "./createKudosDto";

describe("CreateKudosUseCase", () => {
  let useCase: CreateKudosUseCase;
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
    useCase = new CreateKudosUseCase(mockKudosRepository);
  });

  it("should successfully create a kudos", async () => {
    // Arrange
    const createKudosDto: CreateKudosDto = {
      userId: 1,
      createdByUserId: 2,
      teamName: "Engineering",
      category: "Teamwork",
      message: "Great collaboration on the project!",
    };

    const expectedKudos: Kudos = {
      id: 1,
      ...createKudosDto,
      createdAt: new Date(),
      updatedAt: new Date(),
      receiver: {
        id: 1,
        name: "John Doe",
        imageUrl: "https://example.com/john.jpg",
      },
      creator: {
        id: 2,
        name: "Jane Smith",
        imageUrl: "https://example.com/jane.jpg",
      },
    };

    mockKudosRepository.create.mockResolvedValue(expectedKudos);

    // Act
    const result = await useCase.execute(createKudosDto);

    // Assert
    expect(mockKudosRepository.create).toHaveBeenCalledWith(createKudosDto);
    expect(result).toEqual(expectedKudos);
  });

  it("should handle repository errors", async () => {
    // Arrange
    const createKudosDto: CreateKudosDto = {
      userId: 1,
      createdByUserId: 2,
      teamName: "Engineering",
      category: "Teamwork",
      message: "Great collaboration on the project!",
    };

    const error = new Error("Database error");
    mockKudosRepository.create.mockRejectedValue(error);

    // Act & Assert
    await expect(useCase.execute(createKudosDto)).rejects.toThrow("Database error");
    expect(mockKudosRepository.create).toHaveBeenCalledWith(createKudosDto);
  });
});
