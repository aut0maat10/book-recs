class ReviewSerializer < ActiveModel::Serializer
  attributes :id, :rating, :comment
  belongs_to :book
  belongs_to :user
end
