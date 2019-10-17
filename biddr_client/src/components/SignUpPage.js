import React from "react";

import { User } from "../requests";

export function SignUpPage(props) {
  const { onSignUp } = props;

  function handleSubmit(event) {
    event.preventDefault();
    const { currentTarget } = event;
    const fD = new FormData(currentTarget);

    const newUser = {
      first_name: fD.get("first_name"),
      last_name: fD.get("last_name"),
      email: fD.get("email"),
      password: fD.get("password"),
      password_confirmation: fD.get("password_confirmation")
    };

    User.create(newUser).then(res => {
      if (res.id) {
        onSignUp();
        // Once we are successfully signed in,  and the app
        // has a user in our state
        // navigate to '/questions'
        props.history.push("/questions");
      }
    });
  }
  return (
    <main>
      <form className="ui form" onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="first_name">First Name</label>
          <input type="text" name="first_name" id="first_name" />
        </div>
        <div className="field">
          <label htmlFor="last_name">Last Name</label>
          <input type="text" name="last_name" id="last_name" />
        </div>
        <div className="field">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" />
        </div>
        <div className="field">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" />
        </div>
        <div className="field">
          <label htmlFor="password_confirmation">Password Confirmation</label>
          <input
            type="password"
            name="password_confirmation"
            id="password_confirmation"
          />
        </div>
        <button className="ui primary button">Sign Up</button>
      </form>
    </main>
  );
}