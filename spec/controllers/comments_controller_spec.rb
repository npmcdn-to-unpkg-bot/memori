require 'rails_helper'

describe Guestbooks::CommentsController do

  before do
    alice = Fabricate(:user)
    session[:user_id] = alice.id
    bobjohnson = Fabricate(:memorial, user: alice)
    guestb = Fabricate(:guestbook, memorial: bobjohnson)
  end

  describe "POST create" do
    it "creates a valid comment" do
      post :create, commentable: :guestbooks, comment: Fabricate.attributes_for(:comment), memorial_id: Memorial.first.id, guestbook_id: Memorial.first.guestbook.id
      expect(Comment.count).to eq(1)
    end
  end
end


describe Events::CommentsController do

  before do
    alice = Fabricate(:user)
    session[:user_id] = alice.id
    bobjohnson = Fabricate(:memorial, user: alice)
    holiday = Fabricate(:event, memorial: bobjohnson)
  end

  describe "POST create" do
    it "creates a valid comment" do
      post :create, commentable: :events, comment: Fabricate.attributes_for(:comment), memorial_id: Memorial.first.id, event_id: Memorial.first.events.first.id
      expect(Comment.count).to eq(1)
    end
  end
end


describe Photos::CommentsController do

  before do
    alice = Fabricate(:user)
    session[:user_id] = alice.id
    bobjohnson = Fabricate(:memorial, user: alice)
    graduation = Fabricate(:photo, memorial: bobjohnson)
  end

  describe "POST create" do
    it "creates a valid comment" do
      post :create, commentable: :photos, comment: Fabricate.attributes_for(:comment), memorial_id: Memorial.first.id, photo_id: Memorial.first.photos.first.id
      expect(Comment.count).to eq(1)
    end
  end
end
