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

ActiveRecord::Schema.define(version: 20141001001528) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "add_on_users", force: true do |t|
    t.integer  "user_id"
    t.integer  "add_on_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "addresses", force: true do |t|
    t.string   "street_address",        null: false
    t.string   "apartment_number"
    t.string   "city",                  null: false
    t.string   "state",                 null: false
    t.string   "zipcode",               null: false
    t.text     "delivery_instructions"
    t.float    "longitude"
    t.float    "latitude"
    t.integer  "user_id",               null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "items", force: true do |t|
    t.string   "name"
    t.string   "description"
    t.string   "category"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "price"
    t.string   "type"
    t.boolean  "active",      default: false
  end

  create_table "memberships", force: true do |t|
    t.integer  "weeks_remaining"
    t.integer  "meals_remaining"
    t.integer  "meals_per_week"
    t.date     "start_date"
    t.date     "end_date"
    t.string   "status",          default: "active"
    t.integer  "user_id"
    t.integer  "subscription_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "menus", force: true do |t|
    t.string   "title"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.boolean  "current",    default: false
  end

  create_table "promotions", force: true do |t|
    t.string  "code",            null: false
    t.string  "description",     null: false
    t.string  "discount_type",   null: false
    t.integer "discount_amount", null: false
  end

  create_table "selected_items", force: true do |t|
    t.integer  "menu_id"
    t.integer  "menu_item_id"
    t.boolean  "default"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "type"
    t.integer  "user_id"
  end

  create_table "subscriptions", force: true do |t|
    t.string  "name",        null: false
    t.text    "description"
    t.integer "price",       null: false
    t.integer "weeks",       null: false
    t.integer "meals",       null: false
  end

  create_table "users", force: true do |t|
    t.string   "email",                           null: false
    t.string   "first_name",                      null: false
    t.string   "last_name",                       null: false
    t.string   "phone_number",                    null: false
    t.string   "password_digest",                 null: false
    t.boolean  "admin",           default: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

end
