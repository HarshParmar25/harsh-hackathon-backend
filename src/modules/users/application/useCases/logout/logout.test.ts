import { AuthService } from "../../services/authService";
import { LogoutUseCase } from "./logout";

describe("LogoutUseCase", () => {
  let useCase: LogoutUseCase;
  let mockAuthService: jest.Mocked<AuthService>;

  beforeEach(() => {
    mockAuthService = {
      invalidateSession: jest.fn(),
    } as any;
    useCase = new LogoutUseCase(mockAuthService);
  });

  it("should successfully invalidate session and return true", async () => {
    // Arrange
    const sessionToken = "valid-session-token";
    mockAuthService.invalidateSession.mockResolvedValue(true);

    // Act
    const result = await useCase.execute(sessionToken);

    // Assert
    expect(mockAuthService.invalidateSession).toHaveBeenCalledWith(sessionToken);
    expect(result).toBe(true);
  });

  it("should handle session invalidation failure", async () => {
    // Arrange
    const sessionToken = "invalid-session-token";
    mockAuthService.invalidateSession.mockRejectedValue(new Error("Session invalidation failed"));

    // Act & Assert
    await expect(useCase.execute(sessionToken)).rejects.toThrow("Session invalidation failed");
    expect(mockAuthService.invalidateSession).toHaveBeenCalledWith(sessionToken);
  });
});
