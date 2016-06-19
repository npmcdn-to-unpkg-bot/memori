Rails.application.routes.draw do

  root 'pages#home'

  get "/pages/:page" => "pages#show"
  post "pages/contact", to: "pages#contact"

  namespace :admin do
    resources :posts
    resources :templates
  end

  resources :posts, only: [:index, :show]

  resources :memorials, except: [:destroy] do
    member do
      get 'protect'
      post 'access'
      post 'contact'
    end

    resources :guestbooks, only: [:create] do
      resources :comments, module: :guestbooks, only: [:create]
    end

    resources :events, except: [:index, :show] do
      resources :comments, module: :events, only: [:create]
    end

    resources :photos, except: [:index, :show] do
      resources :comments, module: :photos, only: [:create]
    end
  end

  get '/register', to: 'users#new'
  get '/login', to: 'sessions#new'
  post '/login', to: 'sessions#create'
  get '/logout', to: 'sessions#destroy'

  resources :users, only: [:show, :create, :edit, :update]

  # root namespace for show path, like FB
  get ':id', to: 'memorials#show', as: :view_memorial

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
end
