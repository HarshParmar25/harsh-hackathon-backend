import { Request, Response } from "express";
import { CreateTeamFactory } from "../../application/useCases/createTeam/createTeamFactory";
import { UpdateTeamFactory } from "../../application/useCases/updateTeam/updateTeamFactory";
import { DeleteTeamFactory } from "../../application/useCases/deleteTeam/deleteTeamFactory";
import { GetTeamFactory } from "../../application/useCases/getTeam/getTeamFactory";
import { GetAllTeamsFactory } from "../../application/useCases/getAllTeams/getAllTeamsFactory";
import { CreateTeamDto } from "../../application/useCases/createTeam/createTeamDto";
import { UpdateTeamDto } from "../../application/useCases/updateTeam/updateTeamDto";

export class TeamController {
  static async create(req: Request, res: Response): Promise<Response> {
    try {
      const dto: CreateTeamDto = {
        name: req.body.name,
        description: req.body.description,
      };

      const useCase = CreateTeamFactory.create();
      const response = await useCase.execute(dto);

      return res.status(201).json(response);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  static async update(req: Request, res: Response): Promise<Response> {
    try {
      const dto: UpdateTeamDto = {
        id: Number(req.body.id),
        name: req.body.name,
        description: req.body.description,
      };

      const useCase = UpdateTeamFactory.create();
      const response = await useCase.execute(dto);
      return res.json(response);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  static async delete(req: Request, res: Response): Promise<Response> {
    try {
      const id = Number(req.params.id);
      const useCase = DeleteTeamFactory.create();
      await useCase.execute(id);
      return res.status(204).send();
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  static async get(req: Request, res: Response): Promise<Response> {
    try {
      const id = Number(req.params.id);
      const useCase = GetTeamFactory.create();
      const response = await useCase.execute(id);
      return res.json(response);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(404).json({ error: error.message });
      }
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  static async getAllTeams(req: Request, res: Response): Promise<Response> {
    try {
      const useCase = GetAllTeamsFactory.create();
      const response = await useCase.execute();
      return res.json(response);
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}
