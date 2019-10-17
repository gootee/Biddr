class AddAuctionReferencesToBids3 < ActiveRecord::Migration[6.0]
  def change
    add_reference :bids, :auction, foreign_key: true
  end
end
