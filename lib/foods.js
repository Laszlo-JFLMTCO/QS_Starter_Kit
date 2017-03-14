function clearErrors() {
  $('#name-field .validation-error').html("");
  $('#calories-field .validation-error').html("");
}

function checkInputs() {
  clearErrors();
  if ( $('#name-field input').val() == '') {
    $('#name-field .validation-error').html('Please enter a food name');
  };
  if ( $('#calories-field input').val() == '') {
    $('#calories-field .validation-error').html('Please enter a calorie amount');
  };
  if ( $('#name-field input').val() != '' && $('#calories-field input').val() != '') {
    var food = $('#name-field input').val();
    var calories = $('#calories-field input').val();
    var foodsRaw = sessionStorage.getItem("foods");
    var foods = $.parseJSON(foodsRaw);
    foodTableSingleRow(food, calories, true, false, true)
    saveFoodList();
    $('#name-field input').val("");
    $('#calories-field input').val("");
  };
};

function foodTableSingleRow(name, calories, deleteButton, checkBox, addToList){
  var oneRowHtml = '<tr class="food-row"><td class="food-name">' + name + '</td><td class="food-calories">' + calories + '</td>';
  if (deleteButton) {
    oneRowHtml += '<td class="food-delete"><button>-</button></td>';
  }
  oneRowHtml += '</tr>';
  if (addToList) {
    $('tbody').prepend(oneRowHtml);
  } else {
    $('tbody').append(oneRowHtml);    
  }
  loadButton();
};

function loadFoodList(){
  var foodsRaw = sessionStorage.getItem("foods");
  var foods = $.parseJSON(foodsRaw);
  if (foods != null) {
    foods.forEach(function(oneFood){
      foodTableSingleRow(oneFood.name, oneFood.calories, true, false, false);
    });
  };  
};

function createNewFood(name, calories){
  var obj = {};
  obj.name = name;
  obj.calories = calories;
  return obj;
};

function saveFoodList(){
  var foods = [];
  $('.food-row').each(function(){
    var name = $(this).children('.food-name').text();
    var calories = $(this).children('.food-calories').text();
    foods.push(createNewFood(name, calories));
  });
  sessionStorage.setItem('foods', JSON.stringify(foods));
  return foods;
};

function loadButton() {
  $("td.food-delete button").on('click', function() {
    $(this).closest('tr').remove();
    saveFoodList();    
  });
};

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
};

$('document').ready(function() {
  loadFoodList();
  $("#add-food").on('click', function() {
    checkInputs();
  });
  $('#food-filter input').keyup( function() {
    tableFilter();
  });
})
