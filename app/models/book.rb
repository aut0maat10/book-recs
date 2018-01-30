class Book < ApplicationRecord
  has_many :reviews
  has_many :users, through: :reviews 
  belongs_to :genre

  scope :next, lambda {|id| where("id > ?",id).order("id ASC") }

  validates :book_img, :title, :author, :year_published, :description, presence: true
  

  has_attached_file :book_img, styles: { book_index: "250x350>", book_show: "325x475>" }, default_url: "/images/:style/missing.png"
  validates_attachment_content_type :book_img, content_type: /\Aimage\/.*\z/

  def next
    Book.next(self.id).first
  end

  def genre_name=(name)
    self.genre = Genre.find_or_create_by(name: name)
  end
  
  def genre_name
    self.try(:genre).try(:name)
  end

end
