import { SignupUseCase } from "./signup";
import { IUserRepository } from "../../../repositories/userRepository";
import { User } from "../../../domain/entities/user";
import { AuthService } from "../../services/authService";
import { SignupDTO } from "./signupDto";
import { PasswordService } from "../../../../../shared/services/passwordService";
import { Session } from "../../../domain/entities/session";
import { ActivationStatus } from "../../../domain/interfaces/interfaces";

jest.mock("../../../../../shared/services/passwordService");

describe("SignupUseCase", () => {
  let useCase: SignupUseCase;
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
    useCase = new SignupUseCase(mockUserRepository, mockAuthService);

    // Setup PasswordService mocks
    (PasswordService.hash as jest.Mock) = jest.fn();
    (PasswordService.verify as jest.Mock) = jest.fn();
  });

  it("should successfully create a new user and return user with session", async () => {
    // Arrange
    const signupDto: SignupDTO = {
      name: "Test User",
      email: "test@example.com",
      password: "password123",
      role: "user",
    };

    const mockUser = new User({
      id: 1,
      name: signupDto.name,
      email: signupDto.email,
      password: "hashedPassword",
      role: signupDto.role,
      isActive: true,
      activationStatus: ActivationStatus.APPROVED,
    });

    const mockSession = new Session({
      user_id: 1,
      session_token: "mock-token",
      expires_at: new Date(),
    });

    mockUserRepository.findByEmail.mockResolvedValue(null);
    (PasswordService.hash as jest.Mock).mockResolvedValue("hashedPassword");
    mockUserRepository.create.mockResolvedValue(mockUser);
    mockAuthService.createSession.mockResolvedValue(mockSession);

    // Act
    const result = await useCase.execute(signupDto);

    // Assert
    expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(signupDto.email);
    expect(PasswordService.hash).toHaveBeenCalledWith(signupDto.password);
    expect(mockUserRepository.create).toHaveBeenCalled();
    expect(mockAuthService.createSession).toHaveBeenCalledWith(mockUser.getId());
    expect(result).toEqual({
      user: {
        id: mockUser.getId(),
        name: mockUser.getName(),
        email: mockUser.getEmail(),
        role: mockUser.getRole(),
      },
      session: {
        token: mockSession.getSessionToken(),
        expiresAt: mockSession.getExpiresAt(),
      },
    });
  });

  it("should throw error when user already exists", async () => {
    // Arrange
    const signupDto: SignupDTO = {
      name: "Test User",
      email: "existing@example.com",
      password: "password123",
      role: "user",
    };

    const existingUser = new User({
      id: 1,
      name: "Existing User",
      email: signupDto.email,
      password: "hashedPassword",
      role: "user",
      isActive: true,
      activationStatus: ActivationStatus.APPROVED,
    });

    mockUserRepository.findByEmail.mockResolvedValue(existingUser);

    // Act & Assert
    await expect(useCase.execute(signupDto)).rejects.toThrow("User already exists");
    expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(signupDto.email);
  });

  it("should throw error when user creation fails", async () => {
    // Arrange
    const signupDto: SignupDTO = {
      name: "Test User",
      email: "test@example.com",
      password: "password123",
      role: "user",
    };

    const mockUser = new User({
      name: signupDto.name,
      email: signupDto.email,
      password: "hashedPassword",
      role: signupDto.role,
      isActive: true,
      activationStatus: ActivationStatus.APPROVED,
    });

    mockUserRepository.findByEmail.mockResolvedValue(null);
    (PasswordService.hash as jest.Mock).mockResolvedValue("hashedPassword");
    mockUserRepository.create.mockResolvedValue(mockUser);

    // Act & Assert
    await expect(useCase.execute(signupDto)).rejects.toThrow("User not created");
    expect(mockUserRepository.findByEmail).toHaveBeenCalledWith(signupDto.email);
    expect(PasswordService.hash).toHaveBeenCalledWith(signupDto.password);
    expect(mockUserRepository.create).toHaveBeenCalled();
  });
});
