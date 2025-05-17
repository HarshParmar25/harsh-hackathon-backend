import { EmployeeRepositoryImpl } from "../../../infrastructure/repositories/employeeRepositoryImpl";
import { GetEmployeesUseCase } from "./getEmployees";

export class GetEmployeesFactory {
  static create() {
    const employeeRepository = new EmployeeRepositoryImpl();
    return new GetEmployeesUseCase(employeeRepository);
  }
}
