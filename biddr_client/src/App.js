import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// import logo from './logo.svg';
import AuctionShowPage from "./components/AuctionShowPage";
import AuctionIndexPage from "./components/AuctionIndexPage";
import AuctionNewPage from "./components/AuctionNewPage";
import Navbar from "./components/Navbar";
import SignInPage from "./components/SignInPage";
import { SignUpPage } from "./components/SignUpPage";
import { User, Session } from "./requests";
import AuthRoute from "./components/AuthRoute";
import Spinner from "./components/Spinner";
import NotFoundPage from "./components/NotFound";
import './App.css';


class App extends React.Component{
  constructor(props) {
    super(props)
    this.state = {
      currentUser: null,
      loading: true
    }
  }

  getUser = () => {
    User.current()
      .then(data => {
        if (typeof data.id !== "number") {
          this.setState({ loading: false });
        } else {
          this.setState({ loading: false, currentUser: data });
        }
      })
      .catch(() => {
        this.setState({ loading: false });
      });
  };

  signOut = () => {
    Session.destroy().then(() => {
      this.setState({
        currentUser: null
      });
    });
  };

  componentDidMount() {
    console.log("componentDidMount");
    this.getUser();
  }

  render() {
    const { loading, currentUser } = this.state;
    if (loading) {
      return <Spinner />;
    }
    return (
      <Router>
        <div className="ui container">
          <Navbar currentUser={currentUser} onSignOut={this.signOut} />
          {/* Switch allows for one Route component to render its
				  component prop. 
				  If there are multiple that could match that path,
				  then the first one that matches is the one that is 
				  selected (that one that wins). What that means is,
				  the order of your routes matter when using switch
			   */}
          <Switch>
            <Route path="/" exact component={AuctionIndexPage} />
            <Route path="/auctions" exact component={AuctionIndexPage} />
            <AuthRoute
              isAuthenticated={currentUser}
              path="/auctions/new"
              component={AuctionNewPage}
            />
            <Route
              path="/auctions/:id"
              render={routeProps => (
                <AuctionShowPage
                  {...routeProps}
                  currentUser={this.state.currentUser}
                />
              )}
            />
            <Route
              path="/sign_in"
              // component={SignInPage}
              render={routeProps => (
                <SignInPage onSignIn={this.getUser} {...routeProps} />
              )}
            />
            <Route
              exact
              path="/sign_up"
              render={routeProps => (
                <SignUpPage {...routeProps} onSignUp={this.getUser} />
              )}
            />
            
           <Route component={NotFoundPage}
            // We are using it as a lat route so incase no routes are matched from the 
            // top this route should take over and return NotFoundPage Componenet 
            />
          </Switch>
        </div>
      </Router>
    );
  }





  // render() {
  //   return (
  //     <div className="App">
  //       <header className="App-header">
  //         <img src={logo} className="App-logo" alt="logo" />
  //         <p>
  //           Edit <code>src/App.js</code> and save to reload.
  //         </p>
  //         <a
  //           className="App-link"
  //           href="https://reactjs.org"
  //           target="_blank"
  //           rel="noopener noreferrer"
  //         >
  //           Learn React
  //         </a>
  //       </header>
  //     </div>
  //   );    
  // }

}

export default App;
