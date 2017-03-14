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

function checkInputs() {
  clearErrors();
  validateInputs();
  
  if ( $('#name-field input').val() != '' && $('#calories-field input').val() != '') {
    var food = $('#name-field input').val();
    var calories = $('#calories-field input').val();

    $('tbody').prepend('<tr class="food-row"><td>' + food + '</td><td class="food-calories">' + calories + '</td><td class="food-delete"><button>-</button></td></tr>');
    $('#name-field input').val("");
    $('#calories-field input').val("");
  };
};

function createDeleteButton() {
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
    createDeleteButton();
    $('td').on('click', function() {
      var $this = $(this);
      var $input = $('<input>', {
        value: $this.text(),
        type: 'text',
        blur: function() {
          $this.text(this.value);
        },
        keyup: function(e) {
          if (e.which === 13) $input.blur();
        }
      }).appendTo( $this.empty() ).focus();
    });
  });

  $('#food-filter input').keyup( function() {
    tableFilter();
  });


})
