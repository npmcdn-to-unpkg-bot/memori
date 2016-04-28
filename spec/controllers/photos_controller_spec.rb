require 'rails_helper'

describe PhotosController do
  describe 'GET new' do
    before do
      alice = Fabricate(:user)
      session[:user_id] = alice.id
      memorial1 = Fabricate(:memorial, user: alice)
    end
    it "sets the @photo variable" do
      get :new, memorial_id: Memorial.first.id
      expect(assigns(:photo)).to be_new_record
      expect(assigns(:photo)).to be_instance_of(Photo)
    end

    it "renders the new template" do
      get :new, memorial_id: Memorial.first.id
      expect(response).to render_template :new
    end
  end

  describe 'POST create' do
  end

  describe 'GET destroy' do
  end
end
