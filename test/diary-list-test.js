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

  context('can select foods', function(){
    it('can click checkbox', function(){
      var checkbox = $('#foods-for-meals input').first();
      checkbox.click();

      var result = checkbox.is(':checked');
      assert.equal(result, true);
    });

    xit('changes to food list show in diary', function(){

    });
  });

  context('can add foods to breakfast meal table', function(){
    xit('can add foods to breakfast table', function(){

    });

    xit('does not add foods when nothing is checked', function(){

    });
  });
});
