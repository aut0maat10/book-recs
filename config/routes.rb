Rails.application.routes.draw do
  devise_for :users
  root 'books#index'
  resources :books
  resources :users, only: [:index, :show] do
    resources :reviews
  end
  resources :genres do
    resources :books
  end 
end
