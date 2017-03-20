function initializeStorage() {
  if (localStorage.getItem('all-foods') == null ) {
    saveFoodList('all-foods', []);
  };
  if (localStorage.getItem('breakfast') == null ) {
    saveFoodList('breakfast', []);
  };
  if (localStorage.getItem('lunch') == null ) {
    saveFoodList('lunch', []);
  };
  if (localStorage.getItem('snack') == null ) {
    saveFoodList('snack', []);
  };
  if (localStorage.getItem('dinner') == null ) {
    saveFoodList('dinner', []);
  };
};

function reloadTables() {
  emptyTables();
  var result = true;
  result = loadFoodList($('#food-list'));
  result = result && loadFoodList($('#foods-for-meals'));
  result = result && loadFoodList($('#meal-breakfast'));
  result = result && loadFoodList($('#meal-lunch'));
  result = result && loadFoodList($('#meal-snack'));
  result = result && loadFoodList($('#meal-dinner'));
  if (result) {
    updateLineListener();
  }
  updateTotals();
};

function updateTotals(){
  var totalGoal = goalCalories();
  var totalConsumed = getTotalCaloriesFromMeals();
  var totalRemaining = totalGoal - totalConsumed;
  $('#total-summary').children('tfoot').children().children('.total-goal-calories').text(totalGoal);
  $('#total-summary').children('tfoot').children().children('.total-calories').text(totalConsumed);
  $('#total-summary').children('tfoot').children().children('.remaining-calories').text(totalRemaining);
  colorRemainingCalories('#total-summary', totalRemaining);
};

function goalCalories(whichTable){
  //  200 for Snacks, 400 for Breakfast, 600 for Lunch and 800 for Dinner
  var snackGoal = 200;
  var breakfastGoal = 400;
  var lunchGoal = 600;
  var dinnerGoal = 800;
  if (whichTable == null) {
    return snackGoal + breakfastGoal + lunchGoal + dinnerGoal;
  } else {
    if (whichTable.attr('id') == "meal-snack") {
      return snackGoal;
    }
    if (whichTable.attr('id') == "meal-breakfast") {
      return breakfastGoal;
    }
    if (whichTable.attr('id') == "meal-lunch") {
      return lunchGoal;
    }
    if (whichTable.attr('id') == "meal-dinner") {
      return dinnerGoal;
    }
  }
};

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
  } else {
    if (whichTable.attr('id') == "meal-breakfast"){
      var foods = loadFoods('breakfast');
    };
    if (whichTable.attr('id') == "meal-lunch"){
      var foods = loadFoods('lunch');
    };
    if (whichTable.attr('id') == "meal-snack"){
      var foods = loadFoods('snack');
    };
    if (whichTable.attr('id') == "meal-dinner"){
      var foods = loadFoods('dinner');
    };
    var total = totalCalories(foods) || 0;
    var remaining = remainingCalories(whichTable, total) || 0;
    $(whichTable).children('tfoot').children().children('.total-calories').text(total);
    $(whichTable).children('tfoot').children().children('.remaining-calories').text(remaining);
    colorRemainingCalories(whichTable, remaining);
  };
  if (foods != null) {
    var checkBox = whichTable.attr('id') == "foods-for-meals";
    var deleteButton = whichTable.attr('id') != "foods-for-meals";
    foods.forEach(function(oneFood){
      foodTableSingleRow(whichTable, oneFood.name, oneFood.calories, oneFood.id, deleteButton, checkBox, false);
    });
    return true;
  } else {
    return false
  }
};

function getTotalCaloriesFromMeals(){
  var mealTables = [$('#meal-breakfast'), $('#meal-lunch'), $('#meal-snack'), $('#meal-dinner')];
  var totalCalories = 0;
  mealTables.forEach(function(mealTable){
    totalCalories += parseInt($(mealTable).children('tfoot').children().children('.total-calories').text());
  });
  return totalCalories;
};

function totalCalories(foods){
  var total = 0;
  if (foods != null) {
    foods.forEach(function(oneFood){
      total += parseInt(oneFood.calories) || 0;
    });
  }
  return total;
}

function remainingCalories(whichTable, total){
  return goalCalories(whichTable) - total;
};

function colorRemainingCalories(whichTable, remaining){
  if (remaining < 0) {
    $(whichTable).children('tfoot').children().children('.remaining-calories').css('color', 'red');
  } else {
    $(whichTable).children('tfoot').children().children('.remaining-calories').css('color', 'green');
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
  if (location == "food-list"){
    location = 'all-foods';
  };
  var data = loadFoods(location);
  data = $.grep(data, function(e){
    return e.id != foodId;
  });
  saveFoodList(location, data);
  reloadTables();
};

function deleteButtonListener() {
  $("#food-list").on('click', ".food-delete button", function() {
    var location = $(this).parentsUntil('table').parent().attr('id');
    var foodId = $(this).closest('tr').children('.food-id').text();
    var data = location.replace('meal-','');
    removeFood(data, foodId)
  });
};

function saveFoodList(location, data){
  data = sortFoods(data);
  localStorage.setItem(location, JSON.stringify(data));
  return data;
};

function updateFoodList(location, updatedObject){
  var data = loadFoods(location);
  var idIncluded = $.grep(data, function(e){
    return e.id == updatedObject.id;
  });
  if (idIncluded.length > 0){
    data = $.grep(data, function(e){
      return e.id != updatedObject.id;
    });
    data.push(updatedObject);
    saveFoodList(location, data);
    reloadTables();
  };
}

function updateMealLists(updatedObject){
  updateFoodList('breakfast', updatedObject);
  updateFoodList('lunch', updatedObject);
  updateFoodList('snack', updatedObject);
  updateFoodList('dinner', updatedObject);
}

function addToFoodList(row){
  var objectId = $(row).children('.food-id').text();
  var newName = $(row).children('.food-name').text();
  var newCalories = $(row).children('.food-calories').text();
  updatedObject = {name: newName, calories: newCalories, id: objectId };
  updateFoodList('all-foods', updatedObject);
  updateMealLists(updatedObject);
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
  return {
    name: name,
    calories: calories,
    id: Date.now()
  }
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
    var mealFoods = loadFoods(mealTable);
    foods.forEach(function(oneFood) {
      mealFoods.push(oneFood);
    });
    saveFoodList(mealTable, mealFoods);
    reloadTables();
  };
};

function getFoodsFromIds(idCollection){
  var allFoods = loadFoods('all-foods');
  var selectedFoods = [];

  idCollection.forEach(function(i){
    allFoods.forEach(function(j){
      if (i == j.id){
        selectedFoods.push(j);
      }
    });
  })

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

  deleteButtonListener();

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
