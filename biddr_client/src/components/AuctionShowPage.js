import React, { Component } from "react";

import AuctionDetails from "./AuctionDetails";
import BidList from "./BidList";
import BidNew from "./BidNew"
import Spinner from "./Spinner";
import { Auction } from "../requests";

// // Auction Show Component
class AuctionShowPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      auction: null,
      isLoading: true
    };
    // this.deleteAnswer = this.deleteAnswer.bind(this);
  }

  componentDidMount() {
//     // All components are rendered by a Route (like this one)
//     // will be given props by that Route component
//     // One fo these props, called match which contains information
//     // related to the pattern matched path defined in App.js
//     // <Route path="/questions/:id/:test" component={QuestionShowPage}
//     // match: {
//     // params: {
//     // id: <whatever-id-passed>,
//     // test: <whatever-test-passed>
//     // }
//     // }
//     // Because the Route looked like the one above, the Route component
//     // pattern matched on the ':id', and will give us a
//     // param called id within the property of match called param,
//     // as used below
    // debugger
    console.log(this.props)
    Auction.one(this.props.match.params.id).then(auction => {
      
      this.setState({
        auction: auction,
        isLoading: false
      });
    });
  }
//   deleteQuestion() {
//     Question.delete(this.state.question.id).then(data => {
//       this.props.history.push("/questions");
//     });
//   }
//   deleteAnswer(answerId) {
//     console.log("this: ", this);
//     this.setState(state => {
//       return {
//         question: {
//           ...state.question,
//           answers: state.question.answers.filter(
//             answer => answer.id !== answerId
//           )
//         }
//       };
//     });
//   }
  render() {
    if (this.state.isLoading) {
      return <Spinner />;
    }

    const { id: currentUser } = this.props.currentUser;

    if (!this.state.auction){
      return (<div>Auction Doesnt exist</div>)
    }
    
    return (
      <div>
        {/* <h1>Auction Number {this.props.number}</h1> */}
        <AuctionDetails
          {...this.state.auction}
        />
        <BidNew 
          {...this.state.auction}
        />
        {/* {currentUser === author && (
          <DeleteButton onDeleteClick={() => this.deleteQuestion()} />
          )} */}
        <BidList
          bids={this.state.auction.bids}
        />
      </div>
    );
  }
}

export default AuctionShowPage;