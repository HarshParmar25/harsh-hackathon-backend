import { Request, Response } from "express";
import { GetMembersFactory } from "../../application/useCases/getMembers/getMembersFactory";
import { UpdateMemberRoleFactory } from "../../application/useCases/updateMemberRole/updateMemberRoleFactory";
import { DeleteMemberFactory } from "../../application/useCases/deleteMember/deleteMemberFactory";

export class AdminController {
  static async getMembers(req: Request, res: Response): Promise<Response> {
    try {
      const useCase = GetMembersFactory.create();
      const members = await useCase.execute();
      return res.status(200).json(members);
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  static async updateMemberRole(req: Request, res: Response): Promise<Response> {
    try {
      const { role, memberId } = req.body;
      const useCase = UpdateMemberRoleFactory.create();
      const member = await useCase.execute({ memberId: Number(memberId), role });
      return res.status(200).json(member);
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  static async deleteMember(req: Request, res: Response): Promise<Response> {
    try {
      const { memberId } = req.params;
      const useCase = DeleteMemberFactory.create();
      const member = await useCase.execute({ memberId: Number(memberId) });
      return res.status(200).json(member);
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}
