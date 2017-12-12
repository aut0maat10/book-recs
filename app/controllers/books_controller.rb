class BooksController < ApplicationController
  
  before_action :find_book, only: [:show, :edit, :update, :destroy]

  def index 
    if params[:genre_id].nil?
      @books = Book.all
    else
      genre_id = Genre.find_by(id: params[:genre_id]).id 
      @books = Book.where(genre_id: genre_id)
    end 
  end 

  def new
    @book = Book.new 
  end

  def show
  end 

  def create
    @book = Book.new(book_params)
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
      params.require(:book).permit(:genre_name, :title, :author, :year_published, :description, :genre_id)
    end
    
    def find_book
      @book = Book.find(params[:id])
    end 

end