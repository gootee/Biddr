class Auction < ApplicationRecord
  has_many :bids, dependent: :destroy
  belongs_to :user

  validates(:title, presence: true)
  validates(:description, presence: true)
  validates(:ends_at, presence: true)
  validates(:reserve_price, presence: true)
end
