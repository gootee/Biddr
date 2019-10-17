import React from 'react';
// View Auction Component
function AuctionDetails(props) {
	return (
		<div style={{ backgroundColor: 'gray', color: 'maroon' }}>
			<h2>{props.title}</h2>
			<p>
				{props.description} <br />
			</p>
		</div>
	);
}

export default AuctionDetails;