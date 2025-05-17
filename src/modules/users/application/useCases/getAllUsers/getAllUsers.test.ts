import { GetAllUsersUseCase } from "./getAllUsers";
import { IUserRepository } from "../../../repositories/userRepository";
import { User } from "../../../domain/entities/user";

describe("GetAllUsersUseCase", () => {
  let useCase: GetAllUsersUseCase;
  let mockUserRepository: jest.Mocked<IUserRepository>;

  beforeEach(() => {
    mockUserRepository = {
      findByEmail: jest.fn(),
      create: jest.fn(),
      findAll: jest.fn(),
    };
    useCase = new GetAllUsersUseCase(mockUserRepository);
  });

  it("should return all users mapped to DTOs", async () => {
    // Arrange
    const mockUsers: User[] = [
      new User({
        id: 1,
        email: "user1@example.com",
        password: "hashedPassword1",
        name: "User 1",
        role: "user",
      }),
      new User({
        id: 2,
        email: "user2@example.com",
        password: "hashedPassword2",
        name: "User 2",
        role: "user",
      }),
    ];

    mockUserRepository.findAll.mockResolvedValue(mockUsers);

    // Act
    const result = await useCase.execute();

    // Assert
    expect(mockUserRepository.findAll).toHaveBeenCalledTimes(1);
    expect(result).toHaveLength(2);
    expect(result[0]).toEqual({
      id: 1,
      email: "user1@example.com",
      name: "User 1",
      role: "user",
      imageUrl: undefined,
    });
    expect(result[1]).toEqual({
      id: 2,
      email: "user2@example.com",
      name: "User 2",
      role: "user",
      imageUrl: undefined,
    });
  });

  it("should return empty array when no users exist", async () => {
    // Arrange
    mockUserRepository.findAll.mockResolvedValue([]);

    // Act
    const result = await useCase.execute();

    // Assert
    expect(mockUserRepository.findAll).toHaveBeenCalledTimes(1);
    expect(result).toHaveLength(0);
  });

  it("should handle repository errors", async () => {
    // Arrange
    const error = new Error("Database error");
    mockUserRepository.findAll.mockRejectedValue(error);

    // Act & Assert
    await expect(useCase.execute()).rejects.toThrow("Database error");
    expect(mockUserRepository.findAll).toHaveBeenCalledTimes(1);
  });
});
