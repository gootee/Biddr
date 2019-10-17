class RemoveBidReferencesFromAuctions < ActiveRecord::Migration[6.0]
  def change
    remove_reference :auctions, :bids, foreign_key: true
  end
end
