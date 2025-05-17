export interface EmployeeInfo {
  employeeId: number;
  name: string;
  email: string;
  role: string;
  user: {
    id: number;
    name: string;
    imageUrl: string;
  };
}

export interface IEmployeeRepository {
  findAll(): Promise<EmployeeInfo[]>;
}
