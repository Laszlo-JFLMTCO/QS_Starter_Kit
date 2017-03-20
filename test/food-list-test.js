describe('#food-list', function() {
  var $;

  before(function() {
    $ = document.getElementById("foods-frame").contentWindow.$;
  });

  beforeEach(function() {

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

      $('#food-list .food-name').click();

      $('#food-list .food-row:nth-of-type(1) .food-name input').val(newFoodName);
      $('#food-list .food-row:nth-of-type(1) .food-name input').blur();
      var tableRowName = $('#food-list .food-row:nth-of-type(1) .food-name').text();
      assert.equal(tableRowName, newFoodName);
    });

    it('can update food calories', function(){
      var newFoodCalories = 999;

      $('#food-list .food-row:nth-of-type(1) .food-calories').click();
      $('#food-list .food-row:nth-of-type(1) .food-calories input').val(newFoodCalories);
      $('#food-list .food-row:nth-of-type(1) .food-calories input').blur();

      $('#food-list .food-row:nth-of-type(1) .food-calories input').blur();
      var tableRowCalories = $('#food-list .food-row:nth-of-type(1) .food-calories').text();
      assert.equal(tableRowCalories, newFoodCalories);
    });
  });

});
