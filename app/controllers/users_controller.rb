class UsersController < ApplicationController

  def my_reviews
    @user = current_user
    @books = @user.books
  end 

end 