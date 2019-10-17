class AuctionSerializer < ActiveModel::Serializer
  attributes(
    :id, 
    :title, 
    :description, 
    :ends_at,
    :reserve_price,
    :draft,
    :published,
    :reserve_met,
    :post_date,
    :created_at, 
    :updated_at,
    :user_id
  )

  has_many :bids
end
