Rails.application.routes.draw do

  root 'books#index'

  devise_for :users, :controllers => { :omniauth_callbacks => "sessions" }
  
  resources :books do
    resources :reviews
  end 
  resources :genres do
    resources :books
  end
  
  resources :users do
    resources :books, only: [:index]
  end 
  
  get 'users/:id/my_reviews', to: 'users#my_reviews', as: :current_user_reviews 

end
