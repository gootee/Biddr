import React, { Component } from "react";
import { Session } from "../requests";

export default class SignInPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      errors: []
    };

    // this.createSession = this.createSession.bind(this);
  }

  createSession = event => {
    event.preventDefault();
    const { currentTarget: form } = event;
    const formData = new FormData(form);

    const user = {
      email: formData.get("email"),
      password: formData.get("password")
    };

    Session.create(user).then(data => {
      if (data.status === 404) {
        this.setState({
          errors: [{ message: "Wrong email or password" }]
        });
      } else {
        this.setState({
          errors: []
        });
        this.props.history.push("/");
        // The 'history', 'location' & 'match' props are available
        // to any component that is rendered by <Route /> component
        // from 'react-router-dom'
        if (typeof this.props.onSignIn === "function") {
          this.props.onSignIn();
        }
      }
    });
  };

  render() {
    const { errors } = this.state;
    // const errors = this.state.errors;
    return (
      <main>
        <form className="ui form" onSubmit={this.createSession}>
          {errors.length > 0 ? (
            <div className="ui negative message">
              <div className="header">Error Signing in...</div>
              <p>{errors.map(err => err.message).join(", ")}</p>
            </div>
          ) : (
            ""
          )}
          <div className="field">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="email@example.com"
            />
          </div>
          <div className="field">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
            />
          </div>
          <button className="ui primary button" type="submit">
            Sign In
          </button>
        </form>
      </main>
    );
  }
}