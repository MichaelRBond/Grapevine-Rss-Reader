import { GrapevineClient } from "external-clients/grapevine";
import { isNotNull, isNull, Nullable } from "nullable-ts";
import * as React from "react";
import { Login } from "./Login";
import { Reader } from "./Reader";

import "../styles/grapevine.css";

interface Props {
  grapevine: GrapevineClient;
}

interface State {
  password: Nullable<string>;
  username: Nullable<string>;
}

export class Grapevine extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      password: null,
      username: null,
    };

    this.loginCallback = this.loginCallback.bind(this);
  }

  public render() {

    return (
      <div>
        {isNull(this.state.username) &&
          <Login
            loginCallback={this.loginCallback}
          />
        }
        {isNotNull(this.state.username) &&
          <Reader grapevine={this.props.grapevine} />
        }
      </div>
    );
  }

  private async loginCallback(username: string, password: string): Promise<void> {
    const authResult = await this.props.grapevine.authenticate(username, password);
    if (authResult) {
      this.setState({
        password,
        username,
      });
    }
    return;
  }
}
