class RemoveUserIdFromAuctions < ActiveRecord::Migration[6.0]
  def change

    remove_column :auctions, :user_id, :bigint
  end
end
