interface SessionProps {
  user_id: number;
  session_token: string;
  expires_at: Date;
}

export class Session {
  private props: SessionProps;
  constructor(props: SessionProps) {
    this.props = props;
  }

  getUserId() {
    return this.props.user_id;
  }

  getSessionToken() {
    return this.props.session_token;
  }

  getExpiresAt() {
    return this.props.expires_at;
  }
}
