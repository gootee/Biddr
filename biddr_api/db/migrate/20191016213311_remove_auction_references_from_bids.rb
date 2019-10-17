class RemoveAuctionReferencesFromBids < ActiveRecord::Migration[6.0]
  def change
    remove_reference :bids, :auctions, foreign_key: true
  end
end
