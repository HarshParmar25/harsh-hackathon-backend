import { Session } from "./session";

describe("Session", () => {
  const mockProps = {
    user_id: 1,
    session_token: "test-token-123",
    expires_at: new Date("2024-12-31"),
  };

  it("should create a session with valid props", () => {
    const session = new Session(mockProps);

    expect(session.getUserId()).toBe(mockProps.user_id);
    expect(session.getSessionToken()).toBe(mockProps.session_token);
    expect(session.getExpiresAt()).toBe(mockProps.expires_at);
  });

  it("should handle different user IDs", () => {
    const differentUserId = { ...mockProps, user_id: 2 };
    const session = new Session(differentUserId);

    expect(session.getUserId()).toBe(2);
  });

  it("should handle different session tokens", () => {
    const differentToken = { ...mockProps, session_token: "different-token" };
    const session = new Session(differentToken);

    expect(session.getSessionToken()).toBe("different-token");
  });

  it("should handle different expiration dates", () => {
    const differentDate = new Date("2025-12-31");
    const differentExpiry = { ...mockProps, expires_at: differentDate };
    const session = new Session(differentExpiry);

    expect(session.getExpiresAt()).toBe(differentDate);
  });
});
