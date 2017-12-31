Rails.application.routes.draw do

  root 'books#index'

  devise_for :users, :controllers => { :omniauth_callbacks => "sessions" }
  
  resources :books do
    resources :reviews
  end 
  resources :genres do
    resources :books
  end 
end
