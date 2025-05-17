import { NextFunction, Request, Response } from "express";
import { GetProfileFactory } from "../../application/use-cases/getProfile/getProfileFactory";

export class ProfileController {
  static async getProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.session?.user_id;
      if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const useCase = GetProfileFactory.create();
      const profile = await useCase.execute(userId);

      if (!profile) {
        return res.status(404).json({ message: "Profile not found" });
      }

      return res.status(200).json({
        user: {
          id: profile.getUser().getId(),
          name: profile.getUser().getName(),
          email: profile.getUser().getEmail(),
          role: profile.getUser().getRole(),
        },
        receivedKudos: profile.getReceivedKudos(),
        createdKudos: profile.getCreatedKudos(),
      });
    } catch (error) {
      next(error);
    }
  }
}
