require 'rails_helper'

describe Memorial do
  it { should belong_to(:user) }

  it { should have_many(:events) }
  it { should have_many(:photos) }
  it { should have_many(:comments) }

  it { should validate_presence_of(:name) }
  it { should validate_presence_of(:dod) }

end
