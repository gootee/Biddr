class RemoveUserIdFromBids < ActiveRecord::Migration[6.0]
  def change

    remove_column :bids, :user_id, :bigint
  end
end
