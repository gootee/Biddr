import React from 'react';
import '../styles/BidDetails.css';

// BidDetails Component
function BidDetails(props) {

	// debugger
	return (
		<div className="ui segment BidDetails">
			<div className="ui header">Bid Details</div>
			<p>
				{props.bid_amount} <br />
				{props.bid_date.toString()} <br />
			</p>
		</div>
	);
}

export default BidDetails;