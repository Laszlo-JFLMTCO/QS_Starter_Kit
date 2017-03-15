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
    $('#food-list tbody').html('');
    $('#create-form input').val('');
    $('.validation-error').html('');
  });

  beforeEach(function() {
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
      $('#name-field input').val(expectedFirstFoodName);
      $('#calories-field input').val(expectedFirstFoodCalories);
      $('#add-food').click();

      var firstTableRow = $('#food-list .food-row:nth-of-type(1)');
      var firstTableRowName = firstTableRow.children('.food-name').text();
      var firstTableRowCalories = firstTableRow.children('.food-calories').text();

      assert.equal(firstTableRowName, expectedFirstFoodName);
      assert.equal(firstTableRowCalories, expectedFirstFoodCalories);
    });

  });

  context('removing food from table', function(){
    it('will delete food when clicked on - button', function() {
      var expectedFoodName = 'Banana';
      var expectedFoodCalories = 100;

      $('#food-list .food-row:nth-of-type(1) .food-delete button').click();

      var firstTableRow = $('#food-list .food-row:nth-of-type(1)');
      var firstTableRowName = firstTableRow.children('.food-name').text();
      var firstTableRowCalories = firstTableRow.children('.food-calories').text();
      var secondTableRow = $('#food-list .food-row:nth-of-type(2)');

      assert.equal(firstTableRowName, expectedFoodName);
      assert.equal(firstTableRowCalories, expectedFoodCalories);
      assert.equal(secondTableRow.length, 0);
    });

  });

  context('update food items', function(){

    it('can update food name', function(){
      var newFoodName = 'NewFoodName';
      var newFoodCalories = 999;

      $('#food-list .food-row:nth-of-type(1) .food-name').click();
      $('#food-list .food-row:nth-of-type(1) .food-name input').val(newFoodName);
      debugger;
      $('body').click();
      
      var tableRowName = $('#food-list .food-row:nth-of-type(1) .food-name').text();
      var firstTableRowCalories = $('#food-list .food-row:nth-of-type(1) .food-calories').text();

      assert.equal(tableRowName, newFoodName);

    });
    xit('can update food calories', function(){

    });
  });


});