import { Kudos } from "../../../kudos/repositories/kudosRepository";
import { User } from "../../../users/domain/entities/user";

export interface ProfileProps {
  user: User;
  receivedKudos: Kudos[];
  createdKudos?: Kudos[];
}

export class Profile {
  private props: ProfileProps;

  constructor(props: ProfileProps) {
    this.props = props;
  }

  getUser() {
    return this.props.user;
  }

  getReceivedKudos() {
    return this.props.receivedKudos;
  }

  getCreatedKudos() {
    return this.props.createdKudos;
  }
}
