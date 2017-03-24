var daily = [200,400,600,800];
var consumed = [180,450,500,800];
var mealName = ['breakfast', 'lunch', 'snack', 'dinner'];

var x = d3.scale.linear()
  .domain([0,d3.max(daily)])
  .range([0,500]);

function barChart(){
  var chart = d3.select(".chart");
  var bar = chart.selectAll("div");
  var barUpdate = bar.data(daily);
  var barEnter = barUpdate.enter().append("div");
  barEnter.style("width", function(d){ return x(d) + "px"; });
  
  // var label = barEnter.text(function(d){ return d; });

  var progress = barEnter.append("div");
  progress.data(consumed);
  progress.style("width", function(d){ return x(d) + 'px'; });
  progress.text(function(d){ return d; });
}

$('document').ready(function() {
  barChart();
})
