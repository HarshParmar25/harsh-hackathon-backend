import crypto from "crypto";

interface UserProps {
  id?: number;
  name: string;
  email: string;
  password: string;
  role: string;
}
export class User {
  private props: UserProps;
  constructor(props: UserProps) {
    this.props = props;
  }

  getId() {
    return this.props.id;
  }

  getName() {
    return this.props.name;
  }

  getEmail() {
    return this.props.email;
  }

  getPassword() {
    return this.props.password;
  }

  getRole() {
    return this.props.role;
  }
}
