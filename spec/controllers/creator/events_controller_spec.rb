require 'rails_helper'

describe Creator::EventsController do
  describe 'GET new' do
    before do
      alice = Fabricate(:user)
      session[:user_id] = alice.id
      memorial1 = Fabricate(:memorial, user: alice)
    end

    it "sets the @event variable" do
      xhr :get, :new, memorial_id: Memorial.first.slug
      expect(assigns(:event)).to be_new_record
      expect(assigns(:event)).to be_instance_of(Event)
    end

    it "renders the new template" do
      xhr :get, :new, memorial_id: Memorial.first.slug
      expect(response).to render_template :new
    end
  end

  describe 'POST create' do
    before do
      alice = Fabricate(:user)
      session[:user_id] = alice.id
      memorial1 = Fabricate(:memorial, user: alice)
      request.env["HTTP_REFERER"] = 'http://test.host/creator/memorials/' + Memorial.first.slug + '/edit'
      xhr :post, :create, memorial_id: Memorial.first.slug, event: {title: "test", date: DateTime.now, description: "test"}
    end

    it "creates an event record when the input is valid" do
      expect(Event.first.title).to eq("test")
      expect(Event.first.description).to eq("test")
    end

    it "redirects to the edit memorial path" do
      expect(response).to redirect_to edit_creator_memorial_path(Memorial.first)
    end
  end

  describe 'GET destroy' do
    before do
      alice = Fabricate(:user)
      session[:user_id] = alice.id
      memorial1 = Fabricate(:memorial, user: alice)
      request.env["HTTP_REFERER"] = 'http://localhost/' + Memorial.first.slug
      post :create, memorial_id: memorial1.slug, event: {title: "test", date: DateTime.now, description: "test"}
      get :destroy, memorial_id: Memorial.first.slug, id: Event.first.id
    end

    it "deletes the event record" do
      expect(Event.count).to eq(0)
    end
  end
end
