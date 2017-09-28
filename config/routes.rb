Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root "static_pages#root"

  namespace :api, defaults: { format: :json } do
    resources :users, only: [:create]
    resource :session, only: [:create, :destroy]
    resources :restaurants, only: [:create, :show, :index, :update]
    resources :reservations, only: [:create, :show, :index, :update, :destroy]
    resources :reviews, only: [:create, :index, :show, :destroy, :update]
    resources :favorites, only: [:create, :index, :show, :destroy]

    get "search", to: "restaurants#search"
    get "searchRes", to: "reservations#searchRes"
  end
end
