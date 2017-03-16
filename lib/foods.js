function initializeStorage() {
  if (localStorage.getItem('all-foods') == null ) {
    saveFoodList('all-foods', []);
  };
  if (localStorage.getItem('breakfast') == null ) {
    saveFoodList('breakfast', []);
  };
};

function reloadTables() {
  emptyTables();
  var result = false;
  result = loadFoodList($('#food-list'));
  result = result && loadFoodList($('#foods-for-meals'));
  result = result && loadFoodList($('#meal-breakfast'));
  if (result) {
    updateLineListener();
    deleteButtonListener();
  }
}

function emptyTables() {
  $('tbody').empty();
};

function loadFoods(location){
  var foodsRaw = localStorage.getItem(location);
  return $.parseJSON(foodsRaw);
};


function loadFoodList(whichTable) {
  if (whichTable.attr('id') == "food-list" || whichTable.attr('id') == "foods-for-meals") {
    var foods = loadFoods('all-foods');
  };
  if (whichTable.attr('id') == "meal-breakfast"){
    var foods = loadFoods('breakfast');
  };
  var checkBox = whichTable.attr('id') == "foods-for-meals";
  var deleteButton = whichTable.attr('id') == "food-list";
  if (foods != null) {
    var checkBox = whichTable.attr('id') == "foods-for-meals";
    var deleteButton = whichTable.attr('id') == "food-list";
    foods.forEach(function(oneFood){
      foodTableSingleRow(whichTable, oneFood.name, oneFood.calories, oneFood.id, deleteButton, checkBox, false);
    });
    return true;
  } else {
    return false
  }
};

function foodTableSingleRow(whichTable, name, calories, id, deleteButton, checkBox, addToList){
  var oneRowHtml = '<tr class="food-row">';
  if (deleteButton) {
    oneRowHtml += '<td class="hidden food-id"><span>' + id + '</span></td><td class="food-name">' + name + '</td><td class="food-calories">' + calories + '</td><td class="food-delete"><button>&#10005;</button></td>';
  }
  if (checkBox) {
    oneRowHtml = oneRowHtml + '<td class="hidden food-id"><span>'+ id + '</span></td><td><input type="checkbox"></td>' + '<td class="food-name">' + name + '</td><td class="food-calories">' + calories + '</td>';
  }
  oneRowHtml += '</tr>';
  $(whichTable).append(oneRowHtml);
};

function removeFood(location, foodId){
  var data = loadFoods(location);
  data = $.grep(data, function(e){
    return e.id != foodId;
  });
  saveFoodList(location, data);
  reloadTables();
};

function deleteButtonListener() {
  $("#food-list .food-delete button").on('click', function() {
    var location = $(this).parentsUntil('table').parent().attr('id');
    var foodId = $(this).closest('tr').children('.food-id').text();
    debugger;
    removeFood('all-foods', foodId)
  });
};

function saveFoodList(location, data){
  data = sortFoods(data);
  localStorage.setItem(location, JSON.stringify(data));
  return data;
};

function updateFoodList(location, updatedObject){
  var data = loadFoods(location);
  data = $.grep(data, function(e){
    return e.id != updatedObject.id;
  });
  data.push(updatedObject);
  saveFoodList(location, data);
  reloadTables();
}

function addToFoodList(row){
  var objectId = $(row).children('.food-id').text();
  var newName = $(row).children('.food-name').text();
  var newCalories = $(row).children('.food-calories').text();
  updatedObject = {name: newName, calories: newCalories, id: objectId };
  updateFoodList('all-foods', updatedObject);
  return updatedObject;
}

function updateLineListener() {
  $('#food-list .food-name,.food-calories').on('click', function(event) {
    var $input = $('<input>', {
      value: $(event.target).text(),
      type: 'text',
      blur: function() {
        $(event.target).text(this.value);
        addToFoodList($(event.target).parent());
      },
      keyup: function(e) {
        if (e.which === 13) {
          $input.blur();
        };
      }
    }).appendTo( $(event.target).empty() ).focus();
  });
}

function sortFoods(allFoods){
  return allFoods.sort(function (a,b) {
           return b.id - a.id;
         });
};

function addFood() {
  clearErrors();
  validateInputs();
  if ( $('#name-field input').val() != '' && $('#calories-field input').val() != '') {
    var name = $('#name-field input').val();
    var calories = $('#calories-field input').val();
    var allFoods = loadFoods('all-foods');
    if (allFoods == null) {
      allFoods = [];
    }
    clearInputs();
    var newFood = createNewFood(name, calories);
    allFoods.push(newFood);
    saveFoodList('all-foods', allFoods);
    reloadTables();
  };
}

function clearInputs() {
  $('#name-field input').val("");
  $('#calories-field input').val("");
}

function clearErrors() {
  $('#name-field .validation-error').html("");
  $('#calories-field .validation-error').html("");
}

function validateInputs() {
  if ( $('#name-field input').val() == '') {
    $('#name-field .validation-error').html('Please enter a food name');
  };
  if ( $('#calories-field input').val() == '') {
    $('#calories-field .validation-error').html('Please enter a calorie amount');
  };
}

function tableFilter() {
  var input = $('#food-filter input').val().toUpperCase();
  table = document.getElementById('food-list');
  rows = table.getElementsByTagName("tr");

  for (i = 0; i < rows.length; i++) {
    td = rows[i].getElementsByTagName("td")[0];
    if (td) {
      if (td.innerHTML.toUpperCase().indexOf(input) > -1 ) {
        rows[i].style.display = "";
      } else {
        rows[i].style.display = "none";
      }
    }
  }
}

function createNewFood(name, calories){
  var obj = {};
  obj.name = name;
  obj.calories = calories;
  obj.id = Date.now();
  return obj;
};

function addFoodsToMeal(mealTable){
  var checked = $('td input[type="checkbox"]:checked').closest('tr');
  if (checked.length > 0) {
    var idCollection = [];
    $.each(checked, function() {
      var id = $(this).children('.hidden').text();
      idCollection.push(id);
    });
    var foods = getFoodsFromIds(idCollection);
    var mealFoodsRaw = localStorage.getItem(mealTable);
    var mealFoods = $.parseJSON(mealFoodsRaw);
    mealFoods.push(foods);
    saveFoodList(mealTable, mealFoods);
    reloadTables();
  };
};

function getFoodsFromIds(idCollection){
  var foodsRaw = localStorage.getItem("all-foods");
  var allFoods = $.parseJSON(foodsRaw);
  var selectedFoods = [];
  selectedFoods = $.grep(allFoods, function(oneFood){
    var id = oneFood.id.toString();
    return $.inArray(id, idCollection);
  }, true);
  return selectedFoods;
};

$('document').ready(function() {
  // load the data
  initializeStorage();
  reloadTables();

  // event listener for adding food
  $('#add-food').on('click', function() {
    addFood();
  });

  // event listener for filtering
  $('#food-filter input').keyup(function() {
    tableFilter();
  });

  // event listener for checked boxes
  $('.meal-button').on('click', function(){
    var mealTable = this.value;
    addFoodsToMeal(mealTable);
  });
})
