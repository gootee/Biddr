import React from 'react';
import BidDetails from './BidDetails';
// import '../styles/AnswerList.css';

function BidList(props) {
	return (
		<ul className="BidList">
 			{props.bids.map((bid) => (
 				<li className="ui segment" key={bid.id}>
 					<BidDetails
 						bid_amount={bid.bid_amount}
 						bid_date={new Date(bid.bid_date)}
 						created_at={new Date(bid.created_at)}
 					/>
 				</li>
 			))}
 		</ul>
	);
}

export default BidList;