// D3 Scatterplot 

// Define SVG area dimensions
var svgWidth = 960;
var svgHeight = 650;

// Define the chart's margins as an object
var chartMargin = {
    top: 60,
    right: 60,
    bottom: 60,
    left: 60
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
    chart
        .append("g")
        .call(leftAxis);
    chart
        .append("g")
        .attr("transform", "translate(0, " + chartHeight + ")")
        .call(bottomAxis);

    // Append y-axis labels
    chart.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - chartMargin.left)
        .attr("x", 0 - (chartHeight / 2))
        .attr("dy", "1em")
        .attr("class", "axisText")
        .text("Lacks Secondary Education (%)");

    // Append x-axis labels
    chart.append("text")
        .attr("transform", "translate(" + (chartWidth / 2) + " ," + (chartHeight + chartMargin.top -5 ) + ")")
        .attr("class", "axisText")
        .text("Below Poverty (%)");

     // Create the tooltip function
     var toolTip = d3
     .tip()
     .attr("class", "tooltip")
     .offset([80, 5])
     .html(function(data) {
         var state = data.state;
         var educationPercent = data.lacks_secondary_education;
         var povertyPercent = data.below_poverty;
         return (state + "<br>Education: " + educationPercent + "% <br>Poverty: " + povertyPercent + "%");
     });
    // Call the tooltip function
    chart.call(toolTip);
    circles
        // mouseover event to display the tooltip
        .on("mouseover", toolTip.show)
        // mouseout event to hide the tooltip
        .on("mouseout", toolTip.hide);

});