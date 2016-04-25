require 'rails_helper'

describe Photo do
  it { should belong_to(:memorial) }

  it { should have_many(:comments) }

  it { should validate_presence_of(:caption) }
  it { should validate_presence_of(:picture) }
  
end
