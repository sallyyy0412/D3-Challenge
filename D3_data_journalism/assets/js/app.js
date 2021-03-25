// @TODO: YOUR CODE HERE!

$(document).ready(function() {
	scatterPlot();
});

function scatterPlot() {
	// set the dimensions and margins of the graph
	var margin = {top: 20, right: 20, bottom: 30, left: 50},
		width = 700 - margin.left - margin.right,
		height = 500 - margin.top - margin.bottom;

	// set the ranges
	var x = d3.scaleLinear().range([0, width]);
	var y = d3.scaleLinear().range([height, 0]);

	// append the svg obgect to the body of the page
	// appends a 'group' element to 'svg'
	// moves the 'group' element to the top left margin
	var svg = d3.select("#scatter")
		.append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom + 40)
		.append("g")
		.attr("transform",
			  "translate(" + margin.left + "," + margin.top + ")");

	// Get the data
	d3.csv("assets/data/data.csv").then(function(data) {

		// format the data
		data.forEach(function(d) {
			d.healthcare = +d.healthcare;
			d.poverty = +d.poverty;
		});

		// Scale the range of the data
		x.domain([d3.min(data, function(d) { return d.poverty; }) - 1, d3.max(data, function(d) { return d.poverty; }) + 2]);
		y.domain([d3.min(data, function(d) { return d.healthcare; }) - 2, d3.max(data, function(d) { return d.healthcare; }) + 2]);
		
		// Add the scatterplot		
		var elemEnter = svg.selectAll("dot")
			.data(data)
			.enter();
		// Add the circle
		var circle = elemEnter
			.append("circle")
			.attr("fill", "#4287f5")
			.attr("r", 10)
			.attr("cx", function(d) { return x(d.poverty); })
			.attr("cy", function(d) { return y(d.healthcare); });
		/* Create the text for each block */
		elemEnter.append("text")
			.attr("dx", function(d) { return x(d.poverty); })
			.attr("dy", function(d) { return y(d.healthcare) + 4; })
			.attr("text-anchor", "middle")
			.style("font-size", "12px")
			.style('fill', 'white')
			.text(function(d){return d.abbr});

		// Add the X axis
		svg.append("g")
			.attr("transform", "translate(0," + height + ")")
			.call(d3.axisBottom(x));
		// Add x-axis label
		svg.append("text")
			//.attr("transform","translate(" + width / 2 + " ," + (height + margin.top + 30) + ")")
			.attr("y", height + 40)
			.attr("x", width / 2)
			.style("text-anchor", "middle")
			.text("In Poverty (%)");
		// Add the Y axis
		svg.append("g")
			.call(d3.axisLeft(y));
		// Add y-axis label
		svg.append("text")
			.attr("transform", "rotate(-90)")
			.attr("y", - 40)
			.attr("x", 0 - height / 2)
			.style("text-anchor", "middle")
			.text("Lacks Healthcare (%)");
	});
}