import { NextFunction, Request, Response } from "express";
import { CreateKudosFactory } from "../../application/use-cases/createKudos/createKudosFactory";
import { GetAllKudosFactory } from "../../application/use-cases/getAllKudos/getAllKudosFactory";

export class KudosController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = {
        userId: req.body.userId,
        createdByUserId: req.body.createdByUserId,
        teamName: req.body.teamName,
        category: req.body.category,
        message: req.body.message,
      };
      const useCase = CreateKudosFactory.create();
      const kudos = await useCase.execute(dto);
      return res.status(201).json(kudos);
    } catch (error) {
      next(error);
    }
  }

  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const useCase = GetAllKudosFactory.create();
      const kudos = await useCase.execute();
      return res.status(200).json(kudos);
    } catch (error) {
      next(error);
    }
  }
}
