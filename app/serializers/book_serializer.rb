class BookSerializer < ActiveModel::Serializer
  attributes :id, :title, :author, :year_published, :description, :genre_id, :book_img_file_name, :average, :book_img, :book_img_url
  has_many :reviews
  belongs_to :genre

end
