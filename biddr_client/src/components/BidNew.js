import React from "react";
import FormErrors from "./FormErrors";


function NewBidForm(props) {

  const {errors = [] }= props;

  function handleSubmit(event) {
    event.preventDefault();
    const { currentTarget } = event;
    const formData = new FormData(currentTarget);

    const newBid = {
      auction_id: props.id,
      // user_id: this.props.currentUser,
      // user_id: {currentUser},
      bid_amount: formData.get("bid_amount"),
    };

    props.onCreateBid(newBid);
    currentTarget.reset();
  }

  return (
    <form className="ui form" onSubmit={handleSubmit}>
      <div className="field">
        {/* <label htmlFor="reserve_price">Reserve Price</label> */}
        <FormErrors noField forField="bid_amount" errors={errors} />
        
        <input
          type="number"
          name="bid_amount"
          id="bid_amount"
          placeholder="Enter a bid"
        />
      </div>
      <button className="ui button" type="submit">
        Submit
      </button>
    </form>
  );
}

export default NewBidForm;