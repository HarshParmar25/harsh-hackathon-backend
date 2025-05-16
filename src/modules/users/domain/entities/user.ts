interface UserProps {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}
export class User {
  private props!: UserProps;
  constructor() {}

  static create(props: UserProps) {
    const user = new User();
    user.props = props;
    return user;
  }
}
