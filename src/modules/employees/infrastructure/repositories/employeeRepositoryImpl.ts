import { DatabaseManager } from "../../../../shared/database/DatabaseManager";
import { EmployeeInfo, IEmployeeRepository } from "../../repositories/employeeRepository";
import { EmployeeMapper } from "../../mappers/employeeMapper";

export class EmployeeRepositoryImpl implements IEmployeeRepository {
  async findAll(): Promise<EmployeeInfo[]> {
    const query = `
      SELECT e.*, u.id as user_id, u.name as user_name, u.image_url as user_image_url
      FROM employees e
      LEFT JOIN users u ON e.employee_id = u.employee_id
    `;
    const result = await DatabaseManager.query(query);
    return result.map(EmployeeMapper.toDto);
  }
}
