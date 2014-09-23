Rails.application.routes.draw do
  root 'home#index'

  namespace :admin do
    resources :menus, only: [:index, :create, :update, :destroy]
    resources :menu_items, only: [:index, :create, :update, :destroy]
    resources :dashboard, :only => [:index]
    resources :subscriptions, :only => [:create, :update, :destroy]
  end

  resources :subscriptions, :only => [:index]
  resources :users, except: [:new, :edit] do
    collection do
      post 'current_user/addresses' => 'addresses#create'
      # resources :addresses, :only => [:create, :update, :destroy, :show]
    end
  end
  resource :sessions, only: [:create, :destroy]

  namespace :user do
    resources :dashboard, :only => [:index] do
      collection do
        get 'my_account'
      end
    end
  end

end
