require 'rails_helper'

describe Memorial do
  it { should validate_presence_of(:name) }
  it { should validate_presence_of(:biography) }

end
