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

      resources :memorials do
        resources :guestbooks, only: [:create] do
          resources :comments, module: :guestbooks, only: [:create]
        end

        resources :events, only: [:create]
        resources :photos, only: [:create]
      end


      get 'home_posts', to: "posts#home_posts"
      get 'home_photos', to: "photos#home_photos"
      get 'home_memorials', to: "memorials#home_memorials"
      post 'contact_admin', to: "messages#contact_admin"

      get 'guestbook_comments', to: "memorials#guestbook_comments"
      get 'memorial_events', to: "memorials#events"
      get 'memorial_photos', to: "memorials#photos"
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
end
