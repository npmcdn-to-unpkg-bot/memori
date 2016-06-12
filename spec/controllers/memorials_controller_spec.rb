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
      get :show, id: bob.slug
      expect(assigns(:memorial)).to eq(bob)
    end
    it "renders the show template" do
      get :show, id: bob.slug
      expect(response).to render_template :show
    end
  end

  describe "GET new" do
    it "sets the @memorial variable" do
      alice = Fabricate(:user)
      session[:user_id] = alice.id

      get :new
      expect(assigns(:memorial)).to be_new_record
      expect(assigns(:memorial)).to be_instance_of(Memorial)
    end

    it "renders the new template" do
      alice = Fabricate(:user)
      session[:user_id] = alice.id

      get :new
      expect(response).to render_template :new
    end
  end

  describe "POST create" do
    context "with valid inputs" do
      before do
        alice = Fabricate(:user)
        session[:user_id] = alice.id
        post :create, memorial: {name: "james", dod: DateTime.now, theme: "baby"}
      end
      it "create an memorial with valid inputs" do
        expect(Memorial.count).to eq(1)
      end

      it "redirects to the memorial path with valid inputs" do
        expect(response).to redirect_to memorials_path
      end
    end
    context "with invalid inputs" do
      before do
        alice = Fabricate(:user)
        session[:user_id] = alice.id
        post :create, memorial: {name: "james", theme: "baby"}
      end
      it "does not create a memorial with invalid inputs" do
        expect(Memorial.count).to eq(0)
      end
      it "renders the new memorial template with invalid inputs" do
        expect(response).to render_template :new
      end
    end
  end

  describe "GET edit" do
    before do
      alice = Fabricate(:user)
      session[:user_id] = alice.id
      memorial1 = Fabricate(:memorial, user: alice)
    end

    it "sets @memorial variable" do
      get :edit, id: Memorial.first.slug
      expect(assigns(:memorial)).to eq(Memorial.first)
    end
  end
  describe "POST update" do
    before do
      alice = Fabricate(:user)
      session[:user_id] = alice.id
      memorial1 = Fabricate(:memorial, user: alice)
    end

    it "updates the memorial" do
      post :update, id: Memorial.first.slug, memorial: {biography: "hello", dod: DateTime.now, theme: "purps"}
      expect(Memorial.first.biography).to eq('hello')
    end
    it "redirects to the edit memorial path" do
      post :update, id: Memorial.first.slug, memorial: {dod: DateTime.now, theme: "purps"}
      expect(response).to redirect_to edit_memorial_path
    end
  end
end
