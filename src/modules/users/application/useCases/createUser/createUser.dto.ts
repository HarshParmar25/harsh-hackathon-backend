export interface CreateUserDTO {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

/* 
scenario 1: create a new user
1. given an invalid email should return an error
2. given an invalid password should return an error
3. given an empty first name should return an error
4. given an empty last name should return an error
5. if email already exists should return an error
6. given a valid user data should create a new user
 */
