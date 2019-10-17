Rails.application.routes.draw do
  get 'bids/new'
  get 'bids/create'
  get 'welcome/index'
  # get 'users/new'
  # get 'users/create'
  # get 'sessions/new'
  # get 'sessions/create'
  # get 'sessions/destroy'
  # get 'auctions/new'
  # get 'auctions/create'
  # get 'auctions/index'
  # get 'auctions/show'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  namespace :api, defaults: {format: :json } do
    namespace :v1 do
      resources :auctions
      resource :session, only: [:create, :destroy]
      resources :users, only: [:create] do
        get :current, on: :collection
      end
    end
    match "*unmatched", via: :all, to: "application#not_found"
  end

  resources :auctions do
    resources :bids, only: [:create, :destroy]
    # resources :likes, shallow: true, only: [:create, :destroy]
    # The `shallow: true` named argument will separate
    # routes that require the parent from those that don't.
    # Routes that require the parent will not change (i.e. index, new, create).
    # Routes that don't require the parent (i.e. show, edit, update,
    # destroy) will have the parent prefix (i.e. /question/:question_id)
    # removed

    # Example
    # /questions/1/likes/5 becomes: /likes/5

    # /questions/liked
    # Use the `on` named argument to specify how a nested route
    # behaves relative to its parent.

    # `on: :collection` means that it acts on the entire resource
    # All questions in this case.

    # `on:  :member` means that it acts on a single resource. A
    # single question in this case.
    # get :liked, on: :collection
  end

  resources :users, only:[:new, :create]

  resources :sessions, only: [:new, :create] do
    delete :destroy, on: :collection
  end

  get('/', {to: 'welcome#index', as: 'root'})

  match "/delayed_job" => DelayedJobWeb, :anchor => false, :via => [:get, :post]
end
