import { LoginUseCase } from "./login";
import { IUserRepository } from "../../../repositories/userRepository";
import { User } from "../../../domain/entities/user";
import { AuthService } from "../../services/authService";
import { LoginDTO } from "./loginDto";
import { PasswordService } from "../../../../../shared/services/passwordService";
import { Session } from "../../../domain/entities/session";
import { ActivationStatus } from "../../../domain/interfaces/interfaces";

jest.mock("../../../../../shared/services/passwordService");

describe("LoginUseCase", () => {
  let useCase: LoginUseCase;
  let mockUserRepository: jest.Mocked<IUserRepository>;
  let mockAuthService: jest.Mocked<AuthService>;

  beforeEach(() => {
    mockUserRepository = {
      findByEmail: jest.fn(),
      create: jest.fn(),
      findAll: jest.fn(),
      findByRole: jest.fn(),
    };
    mockAuthService = {
      createSession: jest.fn(),
    } as any;
    useCase = new LoginUseCase(mockUserRepository, mockAuthService);

    // Setup PasswordService mocks
    (PasswordService.hash as jest.Mock) = jest.fn();
    (PasswordService.verify as jest.Mock) = jest.fn();
  });

  it("should successfully login user with valid credentials", async () => {
    // Arrange
    const mockUser = new User({
      id: 1,
      email: "test@example.com",
      password: "hashedPassword",
      name: "Test User",
      role: "user",
      isActive: true,
      activationStatus: ActivationStatus.APPROVED,
    });

    const loginDto: LoginDTO = {
      email: "test@example.com",
      password: "password123",
    };

    const mockSession = new Session({
      user_id: 1,
      session_token: "mock-token",
      expires_at: new Date(),
    });

    mockUserRepository.findByEmail.mockResolvedValue(mockUser);
    (PasswordService.verify as jest.Mock).mockResolvedValue(true);
    mockAuthService.createSession.mockResolvedValue(mockSession);

    // Act
    const result = await useCase.execute(loginDto);

    // Assert
    expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(loginDto.email);
    expect(PasswordService.verify).toHaveBeenCalledWith(loginDto.password, mockUser.getPassword());
    expect(mockAuthService.createSession).toHaveBeenCalledWith(mockUser.getId());
    expect(result).toEqual({
      user: {
        id: mockUser.getId(),
        email: mockUser.getEmail(),
        name: mockUser.getName(),
        role: mockUser.getRole(),
      },
      session: {
        token: mockSession.getSessionToken(),
        expiresAt: mockSession.getExpiresAt(),
      },
    });
  });

  it("should throw error when user is not found", async () => {
    // Arrange
    const loginDto: LoginDTO = {
      email: "nonexistent@example.com",
      password: "password123",
    };

    mockUserRepository.findByEmail.mockResolvedValue(null);

    // Act & Assert
    await expect(useCase.execute(loginDto)).rejects.toThrow("Invalid credentials");
    expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(loginDto.email);
  });

  it("should throw error when password is invalid", async () => {
    // Arrange
    const mockUser = new User({
      id: 1,
      email: "test@example.com",
      password: "hashedPassword",
      name: "Test User",
      role: "user",
      isActive: true,
      activationStatus: ActivationStatus.APPROVED,
    });

    const loginDto: LoginDTO = {
      email: "test@example.com",
      password: "wrongpassword",
    };

    mockUserRepository.findByEmail.mockResolvedValue(mockUser);
    (PasswordService.verify as jest.Mock).mockResolvedValue(false);

    // Act & Assert
    await expect(useCase.execute(loginDto)).rejects.toThrow("Invalid credentials");
    expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(loginDto.email);
    expect(PasswordService.verify).toHaveBeenCalledWith(loginDto.password, mockUser.getPassword());
  });

  it("should throw error when user has no ID", async () => {
    // Arrange
    const mockUser = new User({
      email: "test@example.com",
      password: "hashedPassword",
      name: "Test User",
      role: "user",
      isActive: true,
      activationStatus: ActivationStatus.APPROVED,
    });

    const loginDto: LoginDTO = {
      email: "test@example.com",
      password: "password123",
    };

    mockUserRepository.findByEmail.mockResolvedValue(mockUser);
    (PasswordService.verify as jest.Mock).mockResolvedValue(true);

    // Act & Assert
    await expect(useCase.execute(loginDto)).rejects.toThrow("User not found");
    expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(loginDto.email);
    expect(PasswordService.verify).toHaveBeenCalledWith(loginDto.password, mockUser.getPassword());
  });
});
