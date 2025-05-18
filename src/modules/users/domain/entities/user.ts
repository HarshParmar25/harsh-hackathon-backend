import crypto from "crypto";
import { ActivationStatus } from "../interfaces/interfaces";

interface UserProps {
  id?: number;
  name: string;
  email: string;
  password: string;
  role: string;
  imageUrl?: string;
  isActive: boolean;
  activationStatus: ActivationStatus;
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

  getImageUrl() {
    return this.props.imageUrl;
  }

  getActivationStatus() {
    return this.props.activationStatus;
  }

  getIsActive() {
    return this.props.isActive;
  }
}
