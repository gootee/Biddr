class CreateAuctions < ActiveRecord::Migration[6.0]
  def change
    create_table :auctions do |t|
      t.string :title
      t.text :description
      t.datetime :ends_at
      t.float :reserve_price
      t.boolean :draft
      t.boolean :published
      t.boolean :reserve_met
      t.datetime :post_date
      t.bigint :user_id

      t.timestamps
    end
  end
end
