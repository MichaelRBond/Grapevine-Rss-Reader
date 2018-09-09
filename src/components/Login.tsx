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
  loginCallback: (e: any) => Promise<void>;
}

interface State {
  showPassword: boolean;
}

export class Login extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      showPassword: false,
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
              />
          </FormGroup>
          <Button
            onClick={ (e: any) => this.props.loginCallback(e)}
          >
            Login
          </Button>
        </ControlGroup>
      </div>
    );
  }

  private handleLockClick = () => this.setState({ showPassword: !this.state.showPassword });
}
