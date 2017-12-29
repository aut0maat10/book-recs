Rails.application.routes.draw do

  root 'books#index'

  devise_for :users
  get '/auth/facebook/callback' => 'sessions#create'
  
  resources :books do
    resources :reviews
  end 
  # resources :users, only: [:index, :show] do
  #   resources :reviews
  # end
  resources :genres do
    resources :books
  end 
end
