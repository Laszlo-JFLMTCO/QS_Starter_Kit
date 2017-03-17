  // var daily = [200,400,600,800];
  // var consumed = [180,450,500,800];
  // var mealName = ['breakfast', 'lunch', 'snack', 'dinner'];
  var daily = JSON.parse(localStorage.getItem('d3Daily'));
  var consumed = JSON.parse(localStorage.getItem('d3Consumed'));
  var mealName = JSON.parse(localStorage.getItem('d3MealName'));

// establishes a linear scale domain is data space, range is display space
var x = d3.scale.linear()
  .domain([0, d3.max(JSON.parse(localStorage.getItem('d3Daily')))])
  .range([0,420]);

function barChart(){
  // select the chart container by the name of the class
  var chart = d3.select(".chart");
  var bar = chart.selectAll("div");
  var barUpdate = bar.data(JSON.parse(localStorage.getItem('d3Daily')));
  var barEnter = barUpdate.enter().append("div");
  barEnter.style("width", function(d){ return x(d) + "px"; });
  // barEnter.text(function(d){ return d; });

  var progress = barEnter.append("div");
  progress.data(JSON.parse(localStorage.getItem('d3Consumed')));
  progress.style("width", function(d){ return x(d) + "px"; });
  progress.text(function(d){ return d; });

  // var label = barEnter.append('p');
  // label.data(mealName);
  // label.text(function(d){ return d; });
}

$('document').ready(function() {
  barChart();
})
