require 'rails_helper'

describe MemorialsController do
  let(:bob) { Memorial.create(name: "bob", biography: "test") }
  let(:john) { Memorial.create(name: "john", biography: "test") }

  describe "GET index" do
    it "sets the @memorials variable" do
      get :index
      expect(assigns(:memorials)).to eq([bob, john])
    end
    it "renders the index template" do
      get :index
      expect(response).to render_template :index
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
    it "sets the @memorial variable" do
      get :new
      expect(assigns(:memorial)).to be_new_record
      expect(assigns(:memorial)).to be_instance_of(Memorial)
    end
    it "renders the new template" do
      get :new
      expect(response).to render_template :new
    end
  end

  describe "POST create" do
    it "create an memorial with valid inputs"
    it "redirects to the memorial path with valid inputs"
    it "does not create a memorial with invalid inputs"
    it "renders the new template when the input is invalid"
  end
end
