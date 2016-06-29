require 'rails_helper'

describe Photo do
  it { should belong_to(:memorial) }
  it { should have_many(:comments) }
end
