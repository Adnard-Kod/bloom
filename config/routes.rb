Rails.application.routes.draw do
  root 'home#index'

  namespace :admin do
    resources :menus, only: [:index, :create, :update, :destroy] do
      resources :selected_items, :only => [:index, :create, :destroy]
    end
    resources :menu_items, only: [:index, :create, :update, :destroy]
    resources :dashboard, :only => [:index]
    resources :subscriptions, :only => [:create, :update, :destroy]
  end

  resources :subscriptions, :only => [:index]
  resources :users, except: [:new, :edit] do
    resources :addresses, :except => [:show, :edit, :new]
  end
  resource :sessions, only: [:create, :destroy]

  namespace :user do
    resources :dashboard, :only => [:index] do
      collection do
        get 'my_account'
        post 'charge'
      end
    end
  end

end
