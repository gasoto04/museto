// Read and parse the data
d3.csv('data.csv').then(function(data) {
    // Process data: calculate mean values
    let columns = data.columns;
    let meanValues = {};

    columns.forEach(col => {
        let values = data.map(d => +d[col]);
        meanValues[col] = d3.mean(values);
    });

    // Create a bar chart
    const margin = {top: 20, right: 30, bottom: 40, left: 90},
          width = 800 - margin.left - margin.right,
          height = 400 - margin.top - margin.bottom;

    const svg = d3.select("#chart")
                  .append("svg")
                  .attr("width", width + margin.left + margin.right)
                  .attr("height", height + margin.top + margin.bottom)
                  .append("g")
                  .attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3.scaleBand()
                .domain(Object.keys(meanValues))
                .range([0, width])
                .padding(0.1);

    const y = d3.scaleLinear()
                .domain([0, d3.max(Object.values(meanValues))])
                .nice()
                .range([height, 0]);

    svg.append("g")
       .selectAll("rect")
       .data(Object.entries(meanValues))
       .enter()
       .append("rect")
       .attr("x", d => x(d[0]))
       .attr("y", d => y(d[1]))
       .attr("width", x.bandwidth())
       .attr("height", d => height - y(d[1]))
       .attr("fill", "steelblue");

    svg.append("g")
       .attr("class", "x-axis")
       .attr("transform", `translate(0,${height})`)
       .call(d3.axisBottom(x));

    svg.append("g")
       .attr("class", "y-axis")
       .call(d3.axisLeft(y));
});
