function reloadTables() {
  loadFoodList($('#food-list'));
  loadFoodList($('#foods-for-meals'));
}

function loadFoodList(whichTable) {
  var foodsRaw = localStorage.getItem(storedTableName(whichTable));
  var foods = $.parseJSON(foodsRaw);
  var checkBox = whichTable.attr('id') == "foods-for-meals";
  var deleteButton = whichTable.attr('id') == "food-list";
  if (foods != null) {
    foods.forEach(function(oneFood){
      foodTableSingleRow(whichTable, oneFood.name, oneFood.calories, deleteButton, checkBox, false);
    });
    updateLineListener();
  }
};

function foodTableSingleRow(whichTable, name, calories, deleteButton, checkBox, addToList){
  var oneRowHtml = '<tr class="food-row"><td class="food-name">' + name + '</td><td class="food-calories">' + calories + '</td>';
  if (deleteButton) {
    oneRowHtml += '<td class="food-delete"><button>&#10005;</button></td>';
  }
  oneRowHtml += '</tr>';
  if (addToList) {
    $(whichTable).prepend(oneRowHtml);
  } else {
    $(whichTable).append(oneRowHtml);
  }
  createDeleteButton();
};

function createDeleteButton() {
  $("td.food-delete button").on('click', function() {
    $(this).closest('tr').remove();
    saveFoodList($('#food-list'));
  });
};

function saveFoodList(whichTable){
  var foods = [];
  whichTable.children().children('.food-row').each(function(){
    var name = $(this).children('.food-name').text();
    var calories = $(this).children('.food-calories').text();
    foods.push(createNewFood(name, calories));
  });
  localStorage.setItem(storedTableName(whichTable), JSON.stringify(foods));
  return foods;
};

function storedTableName(whichTable){
  if (whichTable.attr('id') == "food-list") {
    return "foods";
  } else if (whichTable.attr('id') == "meal-breakfast") {
    return "mealBreakfast";
  };
};

function updateLineListener() {
  $('td').on('click', function() {
    var $this = $(this);
    var $input = $('<input>', {
      value: $this.text(),
      type: 'text',
      blur: function() {
        $this.text(this.value);
        saveFoodList($('#food-list'));
      },
      keyup: function(e) {
        if (e.which === 13) {
          $input.blur()
          saveFoodList($('#food-list'));
        };
      }
    }).appendTo( $this.empty() ).focus();
  });
}

function addFood() {
  clearErrors();
  validateInputs();

  if ( $('#name-field input').val() != '' && $('#calories-field input').val() != '') {
    var food = $('#name-field input').val();
    var calories = $('#calories-field input').val();
    var foodsRaw = localStorage.getItem("foods");
    var foods = $.parseJSON(foodsRaw);
    foodTableSingleRow($('#food-list'), food, calories, true, false, true);
    saveFoodList($('#food-list'));
    clearInputs();
    updateLineListener();
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

$('document').ready(function() {
  // load the data
  reloadTables();

  // event listener for adding food
  $('#add-food').on('click', function() {
    addFood();
  });

  // event listener for filtering
  $('#food-filter input').keyup(function() {
    tableFilter();
  });
})
