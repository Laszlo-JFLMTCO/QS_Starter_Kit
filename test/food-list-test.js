describe('#food-list', function() {
  var $;

  before(function() {
    $ = document.getElementById("foods-frame").contentWindow.$;
    $.localStorage.clear();
  });

  beforeEach(function() {
    $('#food-list tbody').html('');
    $('#create-form input').val('');
    $('.validation-error').html('');
  });

  context('adding foods to table', function() {

    it('will add food to empty table', function() {
      $('#name-field input').val('Banana');
      $('#calories-field input').val('35');
      $('#add-food').click();

      var firstTableRow = $('#food-list').children().second();
      console.log(firstTableRow);
      var firstTableRowName = firstTableRow.children().first().text();
      console.log(firstTableRowName);

      assert.equal(firstTableRowName, 'Banana')
    });

    xit('will add food to a non-empty table', function() {

    });

  })
});
