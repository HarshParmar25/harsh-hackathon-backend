import { NextFunction, Request, Response } from "express";
import { GetEmployeesFactory } from "../application/useCases/getEmployees/getEmployeesFactory";

export class EmployeeController {
  static async getEmployees(req: Request, res: Response, next: NextFunction) {
    try {
      const useCase = GetEmployeesFactory.create();
      const employees = await useCase.execute();
      return res.status(200).json(employees);
    } catch (error) {
      next(error);
    }
  }
}
