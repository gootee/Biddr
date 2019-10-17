import React from 'react';
import '../styles/BidDetails.css';

// BidDetails Component
function BidDetails(props) {
	return (
		<div className="ui segment BidDetails">
			<div className="ui header">Bid Details</div>
			<p>
				{props.bid_amount} <br />
				{props.bid_date} <br />
			</p>
		</div>
	);
}

export default BidDetails;