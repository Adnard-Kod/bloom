//= require constants/blooming-constants
//= require dispatchers/blooming-dispatcher
var UserSelectedItemStore = (function() {
  var _selectedItems = {Entree: [], "Side Dish": []};
  var CHANGE_EVENT = 'change';
  var FAIL_TO_CREATE_EVENT = 'creation-failed';
  var ActionTypes = BloomingConstants.ActionTypes;
  return {
    mealCombos: [],
    currentCombo: {},
    selectedItems: function() {
      return _selectedItems;
    },
    setMealCombos: function(combos) {
      combos.forEach(function(combo, i) {
        combo.id = i;
        this.mealCombos.push(combo);
      }.bind(this));
      this.currentCombo = this.mealCombos[0];
    },
    setCurrentCombo: function(id) {
      this.currentCombo = this.mealCombos.filter(function(combo) { return combo.id === id})[0];
      this.triggerChange();
    },
    allItems: function() {
      if(_selectedItems["Entree"].length === 0 || _selectedItems["Side Dish"].length === 0) return [];
      return _selectedItems["Entree"].concat(_selectedItems["Side Dish"])
    },
    selectedMenuItems: function() {
      var items = {};
      _selectedItems["Entree"].forEach(function(item){ items[item.menu_item.id] = item.quantity});
      _selectedItems["Side Dish"].forEach(function(item){ items[item.menu_item.id] = item.quantity});
      return items;
    },
    selectedItemsCount: function(category) {
      if(category === "Entree") return this.selectedEntreesCount();
      if(category === "Side Dish") return this.selectedSidesCount();
    },
    selectedEntreesCount: function() {
      var count = 0;
      _selectedItems["Entree"].forEach(function(item) {count += item.quantity});
      return count;
    },
    selectedSidesCount: function() {
      var count = 0;
      _selectedItems["Side Dish"].forEach(function(item) {count += item.quantity});
      return count;
    },

    setSelectedItems: function(data, message) {
      _selectedItems["Entree"] = data.filter(function(item) {
        return item.menu_item.category === 'Entree';
      });
      _selectedItems["Side Dish"] = data.filter(function(item) {
        return item.menu_item.category === 'Side Dish';
      });
      this.triggerChange(message);
    },
    clearSelectedItems: function() {
      _selectedItems = {Entree: [], "Side Dish": []};
    },
    appendToSelectedItems: function(data) {
      previouslySelected =  _selectedItems[data.menu_item.category].filter(function(item) {
        return item.menu_item.id === data.menu_item.id
      })[0]
      if(previouslySelected) {
        previouslySelected.quantity += 1;
      } else {
        data.quantity = 1;
        _selectedItems[data.menu_item.category].push(data);
      }
      this.triggerChange();
    },
    removeFromSelectedItems: function(data) {
      _selectedItems[data.menu_item.category].forEach(function(selectedItem, i) {
        if (selectedItem.menu_item.id === data.menu_item.id) {
          if (selectedItem.quantity === 1) {
            _selectedItems[data.menu_item.category].splice(i, 1);
          } else {
            selectedItem.quantity -= 1;
          }
          return this.triggerChange();
        }
      }.bind(this));
    },
    isSelectionAllowed: function(item) {
      var allowed = false;
      switch(item.category) {
        case "Entree":
          if(this.selectedEntreesCount() < this.currentCombo.entrees) allowed =  true;
          break;
        case "Side Dish":
          if(this.selectedSidesCount() < this.currentCombo.sides) allowed =  true;
          break;
        default:
      }
      return allowed;
    },
    addChangeEvent: function(callback) {
      $(this).on(CHANGE_EVENT, callback);
    },
    removeChangeEvent: function(obj) {
      $(this).off(CHANGE_EVENT, obj);
    },
    addFailToTakeAction: function(callback) {
      $(this).on(FAIL_TO_CREATE_EVENT, callback);
    },
    removeFailToTakeAction: function(obj) {
      $(this).off(FAIL_TO_CREATE_EVENT, obj);
    },
    triggerFailToTakeAction: function(data) {
      $(this).trigger(FAIL_TO_CREATE_EVENT, data);
    },
    triggerChange: function(data) {
      $(this).trigger(CHANGE_EVENT, data);
    },
    update: function(menu_id, id, data) {
      $.ajax({
        url: '/admin/menus/'+menu_id+'/selected_items/'+id,
        type: 'PUT',
        data: {selected_item: data}
      })
      .done(function(data) {
        _selectedItems[menu_id].forEach(function(selectedItem, i) {
          if (selectedItem.id === data.menu_selected_item.id) {
            _selectedItems[menu_id][i] = data.menu_selected_item;
            return this.triggerChange();
          }
        }.bind(this))
      }.bind(this))
      .fail(function(xhr) {
        this.triggerFailToTakeAction([xhr.responseJSON.errors]);
      }.bind(this))
    },
    weeklyItems: function() {
      $.ajax({
        url: '/admin/weekly_orders',
        type: 'GET',
      })
      .done(function(data) {
        _selectedItems = data
        this.triggerChange();
      }.bind(this))
      .fail(function(xhr) {
        this.triggerFailToTakeAction([xhr.responseJSON.errors]);
      }.bind(this))
    },
    saveUserSelectedItems: function() {
      $.ajax({
        url: '/user/selected_items',
        type: 'POST',
        data: {authenticity_token: SessionStore.getAuthenticityToken(), selected_items: this.selectedMenuItems()}
      })
      .done(function(data) {
        this.setSelectedItems(data.selected_items, 'Item Saved!')
      }.bind(this))
      .fail(function(xhr) {
        this.triggerFailToTakeAction([xhr.responseJSON.errors]);
      }.bind(this))
    },
    payload: function(payload) {
      var action = payload.action;
      switch(action.type) {
        case ActionTypes.USER_SELECT_ITEM:
          this.appendToSelectedItems(action.data);
          break;
        case ActionTypes.USER_DESELECT_ITEM:
          this.removeFromSelectedItems(action.data);
          break;
        case ActionTypes.SAVE_USER_SELECTED_ITEMS:
          this.saveUserSelectedItems();
          break;
        default:
          // do nothing
      }
    }
  }
}())

BloomingDispatcher.register(UserSelectedItemStore.payload.bind(UserSelectedItemStore));
