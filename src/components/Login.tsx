import {
  Button,
  ControlGroup,
  FormGroup,
  InputGroup,
  Intent,
  Tooltip,
} from "@blueprintjs/core";
import * as React from "react";

interface Props {
  loginCallback: (username: string, password: string) => Promise<void>;
}

interface State {
  password: string;
  showPassword: boolean;
  username: string;
}

export class Login extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      password: "",
      showPassword: false,
      username: "",
    };
  }

  public render() {

    const lockButton = (
      <Tooltip content={`${this.state.showPassword ? "Hide" : "Show"} Password`}>
          <Button
              icon={this.state.showPassword ? "unlock" : "lock"}
              intent={Intent.WARNING}
              minimal={true}
              onClick={this.handleLockClick}
          />
      </Tooltip>
  );

    return (
      <div id="login" style={{width: "25%"}}>
        <ControlGroup
          vertical={true}
        >
          <FormGroup
            label="Username"
            labelFor="username"
            labelInfo="(required)"
          >
            <InputGroup
              placeholder="Enter your username..."
              type="text"
              name="username"
              id="username"
              onChange={(e: any) => this.setState({username: e.target.value })}
              />
          </FormGroup>
          <FormGroup
            label="Password"
            labelFor="password"
            labelInfo="(required)"
          >
            <InputGroup
              placeholder="Enter your password..."
              rightElement={lockButton}
              type={this.state.showPassword ? "text" : "password"}
              name="password"
              id="password"
              onChange={(e: any) => this.setState({password: e.target.value })}
              />
          </FormGroup>
          <Button
            onClick={ () => this.submit()}
          >
            Login
          </Button>
        </ControlGroup>
      </div>
    );
  }

  private submit(): Promise<void> {

    return this.props.loginCallback(this.state.username, this.state.password);
  }

  private handleLockClick = () => this.setState({ showPassword: !this.state.showPassword });
}
