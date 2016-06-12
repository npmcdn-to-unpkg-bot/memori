require 'rails_helper'

describe PhotosController do
  describe 'GET new' do
    before do
      alice = Fabricate(:user)
      session[:user_id] = alice.id
      memorial1 = Fabricate(:memorial, user: alice)
    end
    it "sets the @photo variable" do
      get :new, memorial_id: Memorial.first.slug
      expect(assigns(:photo)).to be_new_record
      expect(assigns(:photo)).to be_instance_of(Photo)
    end

    it "renders the new template" do
      get :new, memorial_id: Memorial.first.slug
      expect(response).to render_template :new
    end
  end

  describe 'POST create' do
    before do
      alice = Fabricate(:user)
      session[:user_id] = alice.id
      memorial1 = Fabricate(:memorial, user: alice)
      post :create, memorial_id: memorial1.slug, photo: {
        caption: "test",
        picture: fixture_file_upload("/picture.jpg", 'image/jpg')
      }
    end

    it "creates an photo record when the input is valid" do
      expect(Photo.first.caption).to eq("test")
    end

    it "redirects to the edit memorial path" do
      expect(response).to redirect_to edit_memorial_path(Memorial.first)
    end
  end

  describe 'GET destroy' do
    before do
      alice = Fabricate(:user)
      session[:user_id] = alice.id
      memorial1 = Fabricate(:memorial, user: alice)
      post :create, memorial_id: memorial1.slug, photo: {
        caption: "test",
        picture: fixture_file_upload("/picture.jpg", 'image/jpg')
      }
      get :destroy, memorial_id: Memorial.first.slug, id: Photo.first.id
    end

    it "deletes the photo record" do
      expect(Photo.count).to eq(0)
    end
  end
end
