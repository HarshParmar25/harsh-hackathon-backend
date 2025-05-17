import { PasswordService } from "./passwordService";

describe("PasswordService", () => {
  describe("hash", () => {
    it("should hash password correctly", async () => {
      const password = "testPassword123";
      const hashedPassword = await PasswordService.hash(password);

      expect(hashedPassword).toBeDefined();
      expect(hashedPassword).not.toBe(password);
      expect(hashedPassword.length).toBe(64); // SHA-256 produces 64 character hex string
    });

    it("should produce consistent hashes for same input", async () => {
      const password = "testPassword123";
      const hash1 = await PasswordService.hash(password);
      const hash2 = await PasswordService.hash(password);

      expect(hash1).toBe(hash2);
    });
  });

  describe("verify", () => {
    it("should return true for matching password and hash", async () => {
      const password = "testPassword123";
      const hash = await PasswordService.hash(password);

      const result = await PasswordService.verify(password, hash);
      expect(result).toBe(true);
    });

    it("should return false for non-matching password and hash", async () => {
      const password = "testPassword123";
      const wrongPassword = "wrongPassword";
      const hash = await PasswordService.hash(password);

      const result = await PasswordService.verify(wrongPassword, hash);
      expect(result).toBe(false);
    });
  });
});
