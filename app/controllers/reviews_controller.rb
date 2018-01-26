class ReviewsController < ApplicationController
  before_action :find_book
  before_action :find_review, only: [:edit, :update, :destroy, :show]
  before_action :authenticate_user!, only: [:new, :edit]

  def index
    @reviews = @book.reviews 

    respond_to do |format|
      format.html {render 'index.html', layout: false}
      # format.json {render json: @book}
      format.js {render 'app/assets/javascripts/books.js', layout: false}
    end 
    # render layout: false
  end 

  def new
    @review = Review.new
  end 

  def show
    render json: @review
  end 

  def create
    @review = @book.reviews.build(review_params)
    # @review = Review.new(review_params)
    @review.book_id = @book.id
    @review.user_id = current_user.id 
    if @review.save
      respond_to do |f|
        f.html {redirect_to book_path(@book)}
        f.json {render json: @review}
      # render :index, layout: false  
      end 
    else
      render 'books/show'
    end 
  end 

  def edit
  end 

  def update
    if @review.update(review_params)
      redirect_to book_path(@book)
    else 
      render :edit
    end 
  end

  def destroy
    @review.destroy 
    redirect_to book_path(@book)
  end 

  private

    def review_params
      params.require(:review).permit(:rating, :comment)
    end 

    def find_book
      @book = Book.find(params[:book_id])
    end
    
    def find_review
      @review = Review.find(params[:id])
    end 


end 