require 'rails_helper'
require 'pry'

describe MemorialsController do
  let(:bob) { Fabricate(:memorial) }
  let(:john) { Fabricate(:memorial) }

  describe 'GET home' do
    it "renders the home template" do
      get :home
      expect(response).to render_template :home
    end
  end

  describe "GET index" do
    context "with authenticated users" do
      it "sets the @memorials variable" do
        alice = Fabricate(:user)
        session[:user_id] = alice.id
        memorial1 = Fabricate(:memorial, user: alice)
        memorial2 = Fabricate(:memorial, user: alice)
        get :index
        expect(assigns(:memorials)).to eq([memorial2, memorial1])
      end

      it "renders the index template" do
        alice = Fabricate(:user)
        session[:user_id] = alice.id
        memorial1 = Fabricate(:memorial, user: alice)
        memorial2 = Fabricate(:memorial, user: alice)
        get :index
        expect(response).to render_template :index
      end
    end

    context "with unauthenticated users" do
      it "redirects user to the home page" do
        get :index
        expect(response).to redirect_to root_path
      end
    end
  end

  describe "GET show" do
    it "sets the @memorial variable" do
      get :show, id: bob.id
      expect(assigns(:memorial)).to eq(bob)
    end
    it "renders the show template" do
      get :show, id: bob.id
      expect(response).to render_template :show
    end
  end

  describe "GET new" do
  #   it "sets the @memorial variable" do
  #     get :new
  #     expect(assigns(:memorial)).to be_new_record
  #     expect(assigns(:memorial)).to be_instance_of(Memorial)
  #   end
  #   it "renders the new template" do
  #     get :new
  #     expect(response).to render_template :new
  #   end
  end

  describe "POST create" do
  #   it "create an memorial with valid inputs"
  #   it "redirects to the memorial path with valid inputs"
  #   it "does not create a memorial with invalid inputs"
  #   it "renders the new template when the input is invalid"
  end

  describe "GET edit"
  describe "POST update"



end
