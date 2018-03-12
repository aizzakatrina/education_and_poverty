// D3 Scatterplot 

// Define SVG area dimensions
var svgWidth = 960;
var svgHeight = 650;

// Define the chart's margins as an object
var chartMargin = {
    top: 30,
    right: 30,
    bottom: 30,
    left: 30
};

// Save file to variable
var dataFile = 'data.csv';

// Define dimensions of the chart area
var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

// Select body, append SVG area to it, and set the dimensions
var svg = d3
    .select("body")
    .append("svg")
    .attr("height", svgHeight)
    .attr("width", svgWidth)

    // Append a group to the SVG area and shift ('translate') it to the right and to the bottom
var chart = svg
    .append("g")
    .attr("transform", "translate(" + chartMargin.left + ", " + chartMargin.top + ")");

// Load data from data.csv
d3.csv(dataFile, function(error, demoData) {
    if (error) {
        throw error;
    };

    console.log(demoData);

    var abbrvs = [];
    var education = [];
    var poverty = [];

    // Cast the hours value to a number for each piece of demoData
    demoData.forEach(function(data) {

        abbrvs.push(data.abbr);

        data.lacks_secondary_education = parseFloat(data.lacks_secondary_education);
        education.push(data.lacks_secondary_education);

        data.below_poverty = parseFloat(data.below_poverty);
        poverty.push(data.below_poverty);

    });

    console.log(abbrvs);
    console.log(education);
    console.log(poverty);

    // Configure a linear scale, with a range between 0 and the chartWidth
    // Set the domain of the linear scale to 0 and the largest percentage in data.csv
    var xLinearScale = d3
        .scaleLinear()
        .domain([0, d3.max(poverty)])
        .range([0, chartWidth])

    // Create a linear scale, with a range between the chartHeight and 0.
    // Set the domain of the linear scale to 0 and the largest percentage in demoData
    var yLinearScale = d3
        .scaleLinear()
        .domain([0, d3.max(education)])
        .range([chartHeight, 0]);

    // Create two new functions passing our scales in as arguments to create the chart's axes
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale)

    // // Create one SVG rectangle per piece of demoData
    // // Use the linear scales to position each rectangle within the chart
    // svg
    //     .selectAll(".chart")
    //     .data(demoData)
    //     .enter()
    //     .append("rect")
    //     .attr("class", "bar")
    //     .attr("x", function(data) {
    //         return xLinearScale(data.name);
    //     })
    //     .attr("y", function(data) {
    //         return yLinearScale(data.hours);
    //     })
    //     .attr("width", xLinearScale.bandwidth())
    //     .attr("height", function(data) {
    //         return chartHeight - yLinearScale(data.hours);
    //     });

    // Add markers
    var circles = chart
        .selectAll("circle")
        .data(demoData)
        .enter()
        .append("circle")
        .attr("cx", (data, index) => xLinearScale(poverty[index]))
        .attr("cy", (data, index)  => yLinearScale(education[index]))
        .attr("r", "10")
        .attr("stroke", "steelblue")
        .attr("fill", "steelblue")
        .attr("fill-opacity", 0.25);

    // Append two SVG group elements to the SVG area, create the bottom and left axes inside of them
    chart.append("g")
        .call(leftAxis);
    chart.append("g")
        .attr("transform", "translate(0, " + chartHeight + ")")
        .call(bottomAxis);
});