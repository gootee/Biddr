import React, { Component } from "react";
import { Link } from "react-router-dom";

import "../styles/AuctionIndexPage.css";
import NewAuctionForm from "./NewAuctionForm";
import Spinner from "./Spinner";
import { Auction } from "../requests";
// import DeleteButton from './DeleteButton';

class AuctionIndexPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auctions: [],
      isLoading: true
    };
  }

  componentDidMount() {
     // 1. Fetch All the auctions here
     // 2. update state auctions with the auctions that you get back from biddr rails
     // 3. change isLoading to false

     // When the AuctionIndexPage component is mounted,
     // we will fetch all of the auctions from the server
    Auction.all().then(auctions => {
      this.setState({
        auctions: auctions,
        isLoading: false
      });
    });
  }


  // deleteQuestion(id) {
  //   console.log("id: ", id);
  //   console.log("this: ", this);
  //   // To change 'state', you must always use 'this.setState(...)'

  //   // You can use setState by passing an object to its first argument.
  //   // When the time comes, the object will be merged with the current state

  //   // this.setState({
  //   // 	questions: this.state.questions.filter((q) => q.id !== id)
  //   // });
  //   // You can also setState by giving it a callback as first argument
  //   // that receives the current state and props as arguments.
  //   // It must return an object that will be merged with the state
  //   this.setState((state, props) => {
  //     return {
  //       auctions: state.auctions.filter(a => a.id !== id)
  //     };
  //   });
  // }

  render() {
    // debugger
    if (!this.state.auctions) {
      return <Spinner />;
    }
    const filteredAuction = this.state.auctions.filter((a, index) => {
      if (this.props.notShowAll || index < 5) {
        return true;
      }
      return false;
    });

    return (
      
      <main className="AuctionIndexPage">
         <h1>Auctions</h1>
         <ul>
           {filteredAuction.map((auction, index) => (
             <li key={index}>
               <p>
                 <Link to={`/auctions/${auction.id}`}>{auction.title}</Link>
                 <br />
                 <small>
                   Posted at:{" "}
                   {new Date(auction.post_date).toLocaleDateString()}
                 </small>
               </p>
               <p>{auction.description}</p>
             </li>
           ))}
         </ul>
       </main>
    );
  }
}

export default AuctionIndexPage;