require 'rails_helper'

describe Event do
  it { should belong_to(:memorial) }

  it { should have_many(:comments) }

  it { should validate_presence_of(:title) }
  it { should validate_presence_of(:date) }
  it { should validate_presence_of(:description) }  
end
