describe('diary test', function() {
  var $;

  before(function() {
    $ = document.getElementById("foods-frame").contentWindow.$;
    $('#meal-list tbody').html('');
    localStorage.clear();
    var food = document.getElementById("foods-frame").contentWindow.createNewFood("Apple", 100);
    var foods = [];
    foods.push(food);
    localStorage.setItem('all-foods', JSON.stringify(foods));
  });

  beforeEach(function() {
    $('#meal-list tbody').html('');
    localStorage.clear();
    var food = document.getElementById("foods-frame").contentWindow.createNewFood("Apple", 100);
    var foods = [];
    foods.push(food);
    localStorage.setItem('all-foods', JSON.stringify(foods));    
  });

  context('can select foods', function(){
    it('can click checkbox', function(){
      var checkbox = $('#foods-for-meals input').first();
      checkbox.click();

      var result = checkbox.is(':checked');
      assert.equal(result, true);
    });

    it('changes to food list show in diary', function(){
      localStorage.setItem('breakfast', JSON.stringify(foods));    
      
      var newFoodName = 'NewFoodName';

      $('#food-list .food-name').click();
      $('#food-list .food-row:nth-of-type(1) .food-name input').val(newFoodName);

      setTimeout(function(){
        $('#food-list .food-row:nth-of-type(1) .food-name input').blur();
        var tableRowName = $('#food-list .food-row:nth-of-type(1) .food-name').text();
        var mealTableRow = $('#meal-breakfast .food-row:nth-of-type(1)');
        var mealTableRowName = mealTableRow.children('.food-name').text();

        assert.equal(mealTableRowName, newFoodName);
        done();
      }, 500)
    });
  });

  context('can add foods to breakfast meal table', function(){
    it('can add foods to breakfast table', function(){
      var checkbox = $('#foods-for-meals input').first();
      checkbox.click();

      debugger;
      $('#add-to-breakfast').click();

      var mealTableRow = $('#meal-breakfast .food-row:nth-of-type(1)');
      var mealTableRowName = mealTableRow.children('.food-name').text();
      var mealTableRowCalories = mealTableRow.children('.food-calories').text();

      assert.equal(mealTableRowName, 'Apple');
      assert.equal(mealTableRowCalories, '100');
    });

    it('does not add foods when nothing is checked', function(){
      $('#add-to-breakfast').click();

      var mealTableRow = $('#meal-breakfast .food-row:nth-of-type(1)');

      assert.equal(mealTableRow.length, 0);
    });
  });
});

