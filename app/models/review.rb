class Review < ApplicationRecord
  belongs_to :user
  belongs_to :book

  validates :rating, :comment, presence: true
  
end
