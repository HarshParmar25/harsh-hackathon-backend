import crypto from "crypto";

export class PasswordService {
  static async hash(password: string): Promise<string> {
    return crypto.createHash("sha256").update(password).digest("hex");
  }

  static async verify(password: string, hash: string): Promise<boolean> {
    const hashedPassword = await this.hash(password);
    return hash === hashedPassword;
  }
}
