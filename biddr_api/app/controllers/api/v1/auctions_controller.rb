class Api::V1::AuctionsController < Api::ApplicationController
  before_action :authenticate_user!, except: [:index, :show]
  before_action :find_auction, only: [:show]

  def index
    auctions = Auction.order(created_at: :desc)
    # This allos us to use a separate serializer to
    # render json of questions in this list. In this
    # case we are keeping the data limited to the
    # minimum we need.
    render json: auctions
    # render json: questions, each_serializer: QuestionCollectionSerializer
  end

  def show
    render json: @auction
  end

  def create
    auction = Auction.new auction_params
    auction.user = current_user
    if auction.save
      render json: { id: auction.id }
    else
      render(
        json: { errors: auction.errors },
        status: 422 #Unprocessable Entity
      )
    end
  end

  private

  def auction_params
    params.require(:auction).permit(:title, :description, :ends_at, :reserve_price, :draft, :published, :reserve_date, :post_date)
  end

  def find_auction
    @auction = Auction.find params[:id]
  end
end
