Rails.application.routes.draw do

  root 'pages#home'

  get "/pages/:page" => "pages#show"
  post "pages/contact", to: "pages#contact"

  namespace :admin do
    resources :posts
    resources :templates
  end

  namespace :api do
    namespace :v1 do
      resources :posts, only: [:index, :show]
      get 'home_posts', to: "posts#home_posts"
    end
  end

  resources :posts, only: [:index, :show]

  namespace :creator do
    resources :memorials, only: [:index, :new, :create, :edit, :update] do
      member do
        get 'edit_photos'
        get 'edit_events'
        post 'toggle_photo'
        post 'toggle_event'
      end

      resources :guestbooks, only: [:create]
      resources :events, except: [:show]

      resources :photos, except: [:show] do
        member do
          post 'toggle'
        end
      end

    end
  end

  resources :memorials, only: [:show] do
    member do
      get 'protect'
      post 'access'
      post 'contact'
      get 'load_comments'
      get 'load_events'
    end

    resources :guestbooks, only: [:create] do
      resources :comments, module: :guestbooks, only: [:create]
    end

    resources :events, only: [:create] do
      resources :comments, module: :events, only: [:create]
    end

    resources :photos, only: [:create] do
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
