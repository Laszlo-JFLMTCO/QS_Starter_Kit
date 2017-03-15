describe('#food-list', function() {
  var $;

  before(function() {
    $ = document.getElementById("foods-frame").contentWindow.$;
    // Code reference: http://stackoverflow.com/questions/11485420/how-to-mock-localstorage-in-javascript-unit-tests
    // Checking through J-Console, seeing zero difference!!!
    // (function () {
    //   var localStorage = {};
    //   localStorage.setItem = function (key, val) {
    //     this[key] = val + '';
    //   }
    //   localStorage.getItem = function (key) {
    //     return this[key];
    //   }
    //   Object.defineProperty(localStorage, 'length', {
    //     get: function () { return Object.keys(this).length - 2; }
    //   });
    // });
  });

  beforeEach(function() {
    $('#food-list tbody').html('');
    $('#create-form input').val('');
    $('.validation-error').html('');
  });

  context('adding foods to table', function() {

    it('will add food to empty table', function() {
      var expectedFoodName = 'Banana';
      var expectedFoodCalories = 100;
      $('#name-field input').val(expectedFoodName);
      $('#calories-field input').val(expectedFoodCalories);
      $('#add-food').click();

      var firstTableRow = $('#food-list .food-row:nth-of-type(1)');
      var firstTableRowName = firstTableRow.children('.food-name').text();
      var firstTableRowCalories = firstTableRow.children('.food-calories').text();

      assert.equal(firstTableRowName, expectedFoodName);
      assert.equal(firstTableRowCalories, expectedFoodCalories);
    });

    it('will add food to TOP of a non-empty table', function() {
      var expectedFirstFoodName = 'Avocado';
      var expectedFirstFoodCalories = 200;
      var expectedSecondFoodName = 'Banana';
      var expectedSecondFoodCalories = 100;
      $('#name-field input').val(expectedSecondFoodName);
      $('#calories-field input').val(expectedSecondFoodCalories);
      $('#add-food').click();
      $('#name-field input').val(expectedFirstFoodName);
      $('#calories-field input').val(expectedFirstFoodCalories);
      $('#add-food').click();

      var firstTableRow = $('#food-list .food-row:nth-of-type(1)');
      var firstTableRowName = firstTableRow.children('.food-name').text();
      var firstTableRowCalories = firstTableRow.children('.food-calories').text();
      var secondTableRow = $('#food-list .food-row:nth-of-type(2)');
      var secondTableRowName = secondTableRow.children('.food-name').text();
      var secondTableRowCalories = secondTableRow.children('.food-calories').text();
      console.log(localStorage);

      assert.equal(firstTableRowName, expectedFirstFoodName);
      assert.equal(firstTableRowCalories, expectedFirstFoodCalories);
      assert.equal(secondTableRowName, expectedSecondFoodName);
      assert.equal(secondTableRowCalories, expectedSecondFoodCalories);
    });
  });
});