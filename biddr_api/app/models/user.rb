class User < ApplicationRecord
  has_secure_password
  has_many :auctions, dependent: :nullify
  has_many :bids, dependent: :nullify

  before_create :generate_api_key

  def full_name
    "#{first_name} #{last_name}".strip
  end

  private
  
  def generate_api_key
    loop do
      self.api_key = SecureRandom.hex(32)
      break unless User.exists?(api_key: api_key)
    end
  end
end
