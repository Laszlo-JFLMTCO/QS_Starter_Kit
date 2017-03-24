describe('#create-form', function() {
  var $;

  before(function(){
    $ = document.getElementById("foods-frame").contentWindow.$;
  })

  beforeEach(function() {
    //Clear out all the things
    $('#food-list tbody').html('');
    $('#create-form input').val('');
    $('.validation-error').html('');
    window.localStorage.clear()
  });

  afterEach(function() {
    localStorage.clear();
  });

  after(function(){

  });

  context('validations', function() {

    it('will tell me if I fail to enter a name', function() {
      $('#calories-field input').val('35');
      $('#add-food').click();
      var nameValidationContent = $("#name-field .validation-error").text();
      assert.equal(nameValidationContent, "Please enter a food name");
    });

    it('will tell me if I fail to enter calories', function() {
      $('#name-field input').val('Banana');
      $('#add-food').click();
      var caloriesValidationContent = $("#calories-field .validation-error").text();
      assert.equal(caloriesValidationContent, "Please enter a calorie amount");
    });

    it('will submit form if all fields are filled in', function() {
      $('#name-field input').val('Banana');
      $('#calories-field input').val('35');
      $('#add-food').click();

      var nameValidationContent = $("#name-field .validation-error").text();
      assert.equal(nameValidationContent, "");

      var caloriesValidationContent = $("#calories-field .validation-error").text();
      assert.equal(caloriesValidationContent, "");
      localStorage.clear();
    });

  });
});
