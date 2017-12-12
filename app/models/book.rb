class Book < ApplicationRecord
  has_many :reviews
  has_many :users, through: :reviews 
  belongs_to :genre

  def genre_name=(name)
    self.genre = Genre.find_or_create_by(name: name)
  end
  
  def genre_name
    self.try(:genre).try(:name)
  end    
end
