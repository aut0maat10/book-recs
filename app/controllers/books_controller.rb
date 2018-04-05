class BooksController < ApplicationController
  
  before_action :find_book, only: [:show, :edit, :update, :destroy]
  before_action :authenticate_user!, only: [:new, :edit, :show]

  def index 
    if params[:genre_id].nil?
      @books = Book.all
    else
      genre_id = Genre.find_by(id: params[:genre_id]).id 
      @books = Book.where(genre_id: genre_id)
    end 
    respond_to do |f|
      f.html {render :index}
      f.json {render json: @books, methods: [:book_img]}
    end 
  end 

  def new
    @book = current_user.books.build
    @book.user_id = current_user.id
  end

  def show
    respond_to do |format|
      format.html { render :show }
      format.json { render json: @book, :methods => [:book_img_url] }
    end  
  end 

  def create
    @book = current_user.books.build(book_params)
    @book.user_id = current_user.id 
    if @book.save
      redirect_to root_path
    else
      render :new
    end 
  end
  
  def edit
    @genres = Genre.all.map { |genre| [genre.name, genre.id] }
  end

  def update
    if @book.update(book_params)
      redirect_to book_path(@book)
    else
      render :edit 
    end 
  end

  def destroy 
    @book.destroy
    redirect_to root_path
  end 

  private

    def book_params
      params.require(:book).permit(:book_img, :genre_name, :title, :author, :year_published, :description, :genre_id, :user_id, :average)
    end
    
    def find_book
      @book = Book.find(params[:id])
    end 

end