function clearErrors() {
  $('#name-field .validation-error').html("");
  $('#calories-field .validation-error').html("");
}

function checkInputs() {
  clearErrors();
  if ( $('#name-field input').val() == '') {
    $('#name-field .validation-error').html('Please Enter a Name');
  };
  if ( $('#calories-field input').val() == '') {
    $('#calories-field .validation-error').html('Please Enter Calories');
  };
  if ( $('#name-field input').val() != '' && $('#calories-field input').val() != '') {
    var food = $('#name-field input').val();
    var calories = $('#calories-field input').val();

    $('tbody').append('<tr class="food-row"><td>' + food + '</td><td class="food-calories">' + calories + '</td><td class="food-delete"><button>-</button></td></tr>');
    $('#name-field input').val("");
    $('#calories-field input').val("");
  };
};

function loadButton() {
  $("td.food-delete button").on('click', function() {
    $(this).closest('tr').remove();
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
  $("#add-food").on('click', function() {
    checkInputs();
    loadButton();
  });
  $('#food-filter input').keyup( function() {
    tableFilter();
  });
})
