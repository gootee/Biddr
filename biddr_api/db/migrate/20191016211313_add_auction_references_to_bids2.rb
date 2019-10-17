class AddAuctionReferencesToBids2 < ActiveRecord::Migration[6.0]
  def change
    add_reference :bids, :auctions, foreign_key: true
  end
end
