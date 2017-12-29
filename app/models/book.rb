class Book < ApplicationRecord
  has_many :reviews
  has_many :users, through: :reviews 
  belongs_to :genre

  has_attached_file :book_img, styles: { book_index: "250x350>", book_show: "325x475>" }, default_url: "/images/:style/missing.png"
  validates_attachment_content_type :book_img, content_type: /\Aimage\/.*\z/

  def genre_name=(name)
    self.genre = Genre.find_or_create_by(name: name)
  end
  
  def genre_name
    self.try(:genre).try(:name)
  end

end
