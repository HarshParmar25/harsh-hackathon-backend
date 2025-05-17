import { EmployeeInfo } from "../repositories/employeeRepository";

export class EmployeeMapper {
  static toDto(raw: any): EmployeeInfo {
    const user = {
      id: raw.user_id,
      name: raw.user_name,
      imageUrl: raw.user_image_url,
    };

    return {
      employeeId: raw.employee_id,
      name: raw.name,
      email: raw.email,
      role: raw.role,
      user,
    };
  }
}
