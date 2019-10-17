class CreateBids < ActiveRecord::Migration[6.0]
  def change
    create_table :bids do |t|
      t.bigint :user_id
      t.float :bid_amount
      t.datetime :bid_date

      t.timestamps
    end
  end
end
