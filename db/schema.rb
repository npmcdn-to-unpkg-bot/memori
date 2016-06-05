# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160605170157) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "ahoy_events", force: :cascade do |t|
    t.integer  "visit_id"
    t.integer  "user_id"
    t.string   "name"
    t.json     "properties"
    t.datetime "time"
  end

  add_index "ahoy_events", ["name", "time"], name: "index_ahoy_events_on_name_and_time", using: :btree
  add_index "ahoy_events", ["user_id", "name"], name: "index_ahoy_events_on_user_id_and_name", using: :btree
  add_index "ahoy_events", ["visit_id", "name"], name: "index_ahoy_events_on_visit_id_and_name", using: :btree

  create_table "comments", force: :cascade do |t|
    t.string   "author"
    t.string   "commentable_type"
    t.text     "body"
    t.integer  "commentable_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "events", force: :cascade do |t|
    t.string   "title"
    t.string   "picture"
    t.text     "description"
    t.datetime "date"
    t.integer  "memorial_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "summary"
  end

  create_table "guestbooks", force: :cascade do |t|
    t.integer  "memorial_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "letters", force: :cascade do |t|
    t.string   "name"
    t.string   "email"
    t.string   "subject"
    t.text     "content"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "memorials", force: :cascade do |t|
    t.string   "name"
    t.string   "hero"
    t.string   "address"
    t.text     "biography"
    t.integer  "user_id"
    t.datetime "dod"
    t.datetime "dob"
    t.float    "latitude"
    t.float    "longitude"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "template_id"
    t.boolean  "protect"
    t.string   "code"
    t.string   "slug"
  end

  create_table "messages", force: :cascade do |t|
    t.string   "name"
    t.string   "email"
    t.text     "content"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "photos", force: :cascade do |t|
    t.string   "caption"
    t.string   "picture"
    t.integer  "memorial_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "posts", force: :cascade do |t|
    t.string   "title"
    t.string   "picture"
    t.text     "body"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "subtitle"
    t.string   "summary"
  end

  create_table "templates", force: :cascade do |t|
    t.string   "name"
    t.string   "variant"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "theme"
  end

  create_table "users", force: :cascade do |t|
    t.string   "username"
    t.string   "password_digest"
    t.string   "name"
    t.string   "email"
    t.string   "role"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "visits", force: :cascade do |t|
    t.string   "visit_token"
    t.string   "visitor_token"
    t.string   "ip"
    t.text     "user_agent"
    t.text     "referrer"
    t.text     "landing_page"
    t.integer  "user_id"
    t.string   "referring_domain"
    t.string   "search_keyword"
    t.string   "browser"
    t.string   "os"
    t.string   "device_type"
    t.integer  "screen_height"
    t.integer  "screen_width"
    t.string   "country"
    t.string   "region"
    t.string   "city"
    t.string   "postal_code"
    t.decimal  "latitude"
    t.decimal  "longitude"
    t.string   "utm_source"
    t.string   "utm_medium"
    t.string   "utm_term"
    t.string   "utm_content"
    t.string   "utm_campaign"
    t.datetime "started_at"
  end

  add_index "visits", ["user_id"], name: "index_visits_on_user_id", using: :btree
  add_index "visits", ["visit_token"], name: "index_visits_on_visit_token", unique: true, using: :btree

end
