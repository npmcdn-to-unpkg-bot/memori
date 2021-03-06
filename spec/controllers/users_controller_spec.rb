require 'rails_helper'
require 'pry'

describe UsersController do
  describe 'GET new' do
    it 'sets @user' do
      get :new
      expect(assigns(:user)).to be_instance_of(User)
    end
  end

  describe 'POST create' do
    context 'with valid input' do
      before do
        post :create, user: Fabricate.attributes_for(:user)
      end
      it 'creates a new user' do
        expect(User.count).to eq(1)
      end
      it 'redirects to the new memorial path' do
        expect(response).to redirect_to new_creator_memorial_path
      end

    end
    context 'with invalid input' do
      before do
        post :create, user: { username: 'bob' }
      end
      it 'does not create a user' do
        expect(User.count).to eq(0)
      end
      it 'renders the :new template' do
        expect(response).to render_template :new
      end
      it 'sets @user' do
        expect(assigns(:user)).to be_instance_of(User)
      end
    end
  end

  describe 'GET show' do
    it 'sets @user' do
      user = Fabricate(:user)
      get :show, id: user.id
      expect(assigns(:user)).to eq(user)
    end
  end

  describe 'GET edit' do
    it 'sets @user' do
      user = Fabricate(:user)
      get :edit, id: user.id
      expect(assigns(:user)).to eq(user)
    end
  end

  describe 'POST update' do
    it 'sets @user' do
      alice = Fabricate(:user)
      post :update, id: alice.id, user: { username: "till", password: "pass", email: 'bob@bob.com', name: "james" }
      expect(assigns(:user)).to eq(alice)
    end
  end
end
