class Bid < ApplicationRecord
  belongs_to :user
  belongs_to :auction

  validates(:bid_amount, presence: true)
end
