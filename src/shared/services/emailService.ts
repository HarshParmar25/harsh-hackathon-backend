import Mailjet from "node-mailjet";

export class EmailService {
  private mailjet: Mailjet;

  constructor() {
    this.mailjet = new Mailjet({
      apiKey: process.env.MAILJET_API_KEY || "",
      apiSecret: process.env.MAILJET_SECRET_KEY || "",
    });
  }

  async sendEmail(to: string | string[], subject: string, htmlPart: string) {
    const recipients = Array.isArray(to) ? to.map((email) => ({ Email: email })) : [{ Email: to }];
    try {
      const result = await this.mailjet.post("send", { version: "v3.1" }).request({
        Messages: [
          {
            From: {
              Email: process.env.MAILJET_SENDER_EMAIL || "noreply@kudosapp.com",
              Name: "Captain Harsh's Kudos Station!",
            },
            To: recipients,
            Subject: subject,
            HTMLPart: htmlPart,
          },
        ],
      });

      console.log("Email sent successfully to:", to);
      return result;
    } catch (error) {
      console.error("Error sending email:", error);
      throw new Error("Failed to send email");
    }
  }
}
