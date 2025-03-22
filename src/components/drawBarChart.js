
import * as d3 from "d3";

export let drawBarChart = (barChartLayer, data, xScale, yScale, barChartWidth, barChartHeight) => {
  
    //Task 7: Complete the code to draw the bars
    //Hint:
    //1. The bars are drawn as rectangles
    //2. Add a mouseover event to the bar
    //3. The mouseover event should also highlight the corresponding points in the scatter plot
    //4. The mouseout event should remove the highlight from the corresponding points in the scatter plot 
    //5. You can refer to the code in the drawScatterPlot function 
  barChartLayer.selectAll('.bar')
    .data(data)
    .enter()
    .append('rect')
    .attr('class', d=>`bar ${d.station.replace(/[^a-zA-Z]/g, "")}`)
    .attr('x', d => xScale(d.station))
    .attr('y', d => yScale(d.start))
    .attr('width', xScale.bandwidth())
    .attr('height', d => barChartHeight - yScale(d.start))
    .style('fill', 'steelblue')
    .style('stroke', 'black')

    .on('mouseover', (event, d) => {
      d3.select(event.target).style('fill', 'red');
      //Task 8: Connect the bar chart with the scatter plot
      //Hint:
      //1. Add a mouseover event to the bar
      //2. The mouseover event should also highlight the corresponding points in the scatter plot
      const stationClass = d.station.replace(/[^a-zA-Z]/g, "");
      const point = d3.select(`.point.${stationClass}`);
      point.attr('r', 10)
           .style('fill', 'red')
           .raise();

      const scatterPlotLayer = d3.select("#scatter-plot");
      scatterPlotLayer.append("rect")
          .attr("class", "highlight-rect")
          .attr("x", 0)
          .attr("y", 0)
          .attr("width", 545) // scatterPlotWidth = innerWidth
          .attr("height", 360) // scatterPlotHeight = innerHeightScatter
          .style("fill", "yellow")
          .style("opacity", 0.5)
          .style("pointer-events", "none")
          .lower();
    })
    // Task 7: Mouseout event
    .on('mouseout', (event, d) => {
      d3.select(event.target).style('fill', 'steelblue');

      const stationClass = d.station.replace(/[^a-zA-Z]/g, "");
      const point = d3.select(`.point.${stationClass}`);
      point.attr('r', 5)
           .style('fill', 'steelblue');
      const scatterPlotLayer = d3.select("#scatter-plot")
      scatterPlotLayer.select(".highlight-rect").remove();
    });
};

  
  
