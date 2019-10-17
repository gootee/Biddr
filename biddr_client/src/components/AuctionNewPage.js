import React, { Component } from "react";
import NewAuctionForm from "./NewAuctionForm";
import { Auction } from "../requests";

export default class AuctionNewPage extends Component {
constructor(props){
  super(props);
  this.state={
    error:[]
  }
  this.createAuction =this.createAuction.bind(this);
}
  createAuction = params => {
    // When our new question is submitted,
    // send the form data in a fetch request to the server
    Auction.create(params).then(auction => {
      if(auction.errors){
        // deal with validation errors
        // this.setState({error: question.errors});

        this.setState({
          errors: Object.keys(auction.errors).map(errorKey => {
              return {
                  field: errorKey,
                  message: auction.errors[errorKey].join(", ")
              };
          })
      });
      } else {
      // This is how you do navigation using react-router-dom
      // The 'Route' component gives all components that it renders
      // (like this one) a prop named 'history'
      // This prop is an array-like structure that keeps track of
      // the entire navigation history within the app
      // To navigate to a new path, we use the 'push' method
      // to push a new path onto this history array-like thing
      this.props.history.push(`/auctions/${auction.id}`);
      }

    });
  };

  render() {
    return (
      <main>
        <div className="header">Ask a Auction</div>
        <NewAuctionForm  errors={this.state.errors} onCreateAuction={this.createAuction} />
      </main>
    );
  }
}