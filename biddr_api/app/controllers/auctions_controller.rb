class AuctionsController < ApplicationController
  before_action :find_auction, only: [:show]

  def new
    @auction = Auction.new
    render :new
  end

  def create
    @auction = Auction.new auction_params
    @auction.user = current_user

    if @auction.save
      flash[:notice] = "Auction created successfully"
      redirect_to auction_path(@auction)
    else
      render :new
    end
  end

  def index
    @questions = Question.order(created_at: :desc)
  end

  def show
    @bid  = Bid.new
    @bids = @auction.bids.order(created_at: :desc)
    respond_to do |format|
      format.html { render }
      format.json { render json: @auction }
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
