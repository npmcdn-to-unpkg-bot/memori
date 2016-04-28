require 'rails_helper'

describe PhotosController do
  describe 'POST create'

  describe 'GET destroy' do
    let(:current_user) { Fabricate(:user) }
    let(:memorial) { Fabricate(:memorial) }
    before { session[:user_id] = current_user.id }

    before do
      post :create, photo: Fabricate.attributes_for(:photo), memorial_id: memorial.id
    end

    it "deletes the photo" do
      get :delete, photo.id
      expect(Photo.count).to eq(0)
    end

  end
end
