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

  getRemainingDays(ends_at_date) {
    const today = new Date()
    if (ends_at_date > today) {
      const remainingDays = Math.floor((ends_at_date - today)/(1000 * 24 * 60 * 60))
    return remainingDays.toString() + " days remaining"
    } else {
      return "Ended " + ends_at_date.toDateString()
    }
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
    if (!this.state.auctions) {
      return <Spinner />;
    }
    const filteredAuction = this.state.auctions.filter((a, index) => {
      if (this.props.notShowAll || index < 10) {
        return true;
      }
      return false;
    });

    return (
      <main id="main" className="AuctionIndexPage">
        {/* <h1>Auctions</h1> */}
        <div className="container">
          <div className="row">
            <div className="auction-index col-sm-12 col-md-10">
              <ul>
                {filteredAuction.map((auction, index) => (
                  <li key={index}>
                    <div className="card auction-index-item">
                      <div className="card-body">
                        <div className="card-title">
                          <div className="auction-name">
                            <p><Link  className="auction-name" to={`/auctions/${auction.id}`}>{auction.title}</Link></p>
                            {/* id = {auction.id} */}
                          </div>
                          <div className="auction-date-info">
                            <p>
                              {/* <small> */}
                                <div>
                                  { this.getRemainingDays(new Date(auction.ends_at)) }
                                </div>
                              {/* </small> */}
                            </p>
                          </div>
                          
                        </div>
                        <div className="card-description">
                          <p>{auction.description}</p>
                        </div>
                      </div>
                              
                    </div>
                  </li>
                ))}
              </ul> 
            </div>          
          </div>
        </div>
      </main>
    );
  }
}

export default AuctionIndexPage;