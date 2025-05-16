import { CreateUserUseCase } from "./createUser";

describe("CreateUserUseCase", () => {
  const createUserUseCase = new CreateUserUseCase();
  const defaultUserData = {
    firstName: "John",
    lastName: "Doe",
    password: "123456",
    email: "test@test.com",
  };

  test.each(["invalid-email", "test@", "@test.com", "test@test"])(
    "should throw error for invalid email: %s",
    (email) => {
      expect(() => {
        createUserUseCase.execute({
          ...defaultUserData,
          email,
        });
      }).toThrow("Email address not valid");
    }
  );

  test("Given invalid password should throw error", () => {
    expect(() => {
      createUserUseCase.execute({
        ...defaultUserData,
        password: "12345",
      });
    }).toThrow("Password must be at least 6 characters long");
  });
});
