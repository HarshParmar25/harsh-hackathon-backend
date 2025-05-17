import { EmployeeInfo, IEmployeeRepository } from "../../../repositories/employeeRepository";

export class GetEmployeesUseCase {
  constructor(private readonly employeeRepository: IEmployeeRepository) {}

  async execute(): Promise<EmployeeInfo[]> {
    return this.employeeRepository.findAll();
  }
}
