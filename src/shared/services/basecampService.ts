import axios from "axios";

export class BasecampService {
  private static readonly BASE_URL = process.env.BASECAMP_URL || "";

  static async sendNotification(content: string): Promise<void> {
    try {
      if (process.env.SEND_NOTIFICATION === "true") {
        await axios.post(this.BASE_URL, { content });
      }
    } catch (error) {
      console.error("Failed to send Basecamp notification:", error);
      // We don't want to throw the error since this is a non-critical operation
    }
  }
}
