import { isNotNull, isNull, Nullable } from "nullable-ts";
import * as React from "react";
import { Login } from "./Login";

interface State {
  password: Nullable<string>;
  username: Nullable<string>;
}

export class Grapevine extends React.Component<{}, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      password: null,
      username: null,
    };
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
          <h1>Hello, Grapevine!</h1>
        }
      </div>
    );
  }

  private async loginCallback(e: any): Promise<void> {
    // get username
    // get password
    // send to grapevine
    console.log("bar");
    return;
  }
}
