# Blooming Spoon
## Setup
```bash
npm install react-tools
```

All your react work should happen in app/assets/react. You should NOT touch any files under app/assets/javascripts/react, these should be built automatically by running:


```bash
jsx --watch app/assets/react app/assets/javascripts/react
```
## Terminology
- meal: 16 ounces of entree, 8 ounces of side dish (feeds 1)
- container: contains 2 portions of entree or side dish

*We don't deliver half containers, minimum serving is 1 container*

### Subscription Clients
Clients can signup/login with info:

  - physical address
  - phone number
  - delivery instructions: walk through the back gate and watch out for the dog. his name is flooky

### Menus
- Admin can create menus with optional pre-existing items (you don't have to reenter the same item again)
- Clients can see current menu

### Invoices
- create invoices/receipts per transaction

### Orders
#### Packages
- We are thinking of meals, but presenting them in packages.
- Admin can CURD packages
- Client can order a package and pay for packages.
- Clients can view their ordering history.
- Clients can print invoices/receipts for their orders.
- Admin can view current orders
- Admin can see totals of quantities ordered of each menu item.

### Payments
- Stripe
- Save client's info for easy payments.

### Frequency
- We deliver weekly only, no daily.
- Minimum 2 meals per order/customization
- We never deliver less than 6 meals per week so frequency can't leave a meal debt less than 6 meals.

### Hold
- a client can put their subscription on hold (in the case they're traveling) 4 weeks max.

### Add ons
- Advertising products that you can add on to your meals. These will paid for separately.
- Add ons are on weekly basis, they will be delivered with the weekly meal.

### Add on item
- Name
- Price
- Description
- Ingredient
- Tags
- Nice to have: image

### Menu
#### Customization
- All items are in serving 2, no single servings.
- Admin can create future/unpublished menus
- Admin creates/customize weekly menu (by defining it or choosing from pre-defined):
  - 5 entrees
  - 5 side dishes
- Admin can choose the defaults for all clients
- Client can change their defaults by choosing:
  - How many entrees and how many side dishes, keeping in mind that 2 side dishes == 1 entree.
- Clients receive notice about menu on Tuesdays
- Clients can customize menu By end of day Thursday
- Admin can customize when is the notice date and when is the cutoff/deadline date

### Upgrades
Use Github's philosophy on upgrading, just a checkbox.

### Menu Items
- Name
- Entree / Side Dish
- Description
- Ingredients
- Tags (Gluten free, spicy, etc.)
- Nice to haves:
  - image
  - Admin can see which are the most ordered menu items.

### Ingredients (nice to have)
- We can add a specific quantities of ingredients for each menu item

### Grocery list (nice to have)
Use the ingredients and the quantities of delivery to populate a grocery list

### Guest Clients
- They can subscribe for weekly menu/newsletter/recipes/discounts without signing up.

### Data
- Find a list of all foods known to man :)

### Labels
- Admin can print labels for the menu items that have been ordered:
  - label looks like: #{menu item name} - #{ingredients} - #{date}
- Admin can print client receipts/invoice and pack them:
  - packing sheets have client name, address, and list of menu items and quantities

### Discounts / Promotions
- Admin can generate promo codes:
  - code
  - dollar amount off or percentage
  - combine with package discounts?
  - expiration
- Admin can send promo codes to clients
- Admin can promote a code for guest/existing clients on front page

### Delivery (nice to have)
Admin can see a delivery route map

### Communication
- Admin can CRUD email communication templates (welcome, menu reminder, etc)



