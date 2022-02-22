import React from 'react';
import * as d3 from 'd3';

import { useD3 } from './useD3';

// Leader Line
function drawLineBetweenTwoObjects(circle, text) {
  const circleRef = d3.select(circle);
  const textRef = d3.select(text);
  const circle_cx = Number(circleRef.attr('cx'));
  const circle_cy = Number(circleRef.attr('cy'));
  const circle_r = Number(circleRef.attr('r'));
  const text_x = Number(textRef.attr('x'));
  const text_y = Number(textRef.attr('y'));
  const tBound = textRef.node().getBBox();

  const firstPoint = `M ${circle_cx} ${circle_cy}`;
  let LastPoint = `L ${text_x} ${text_y}`;
  let middlePoint = '';
console.log(typeof text_x);
  switch (true) {
    case (circle_cx - circle_r - 20) > (text_x + tBound.width):
      middlePoint = `L ${circle_cx} ${text_y}`;
      LastPoint = `L ${text_x + tBound.width} ${text_y}`;
      break;
    case (circle_cx - circle_r - 20) < (text_x + tBound.width):
      middlePoint = `L ${text_x + (tBound.width) / 2} ${circle_cy}`;
      LastPoint = `L ${text_x + (tBound.width) / 2} ${text_y + 5}`;
      break;
    default:
      break;
  }
  
  if (d3.select(".leader-group").select("path").empty()) {
    d3.select(".leader-group")
      .append("path")
      .attr("d", `${firstPoint} ${middlePoint} ${LastPoint}`)
      .attr("stroke", "black")
      .attr("fill", "none")
      .attr("stroke-width", "2");
  } else {
    d3.select(".leader-group").select("path")
      .attr("d", `${firstPoint} ${middlePoint} ${LastPoint}`)
      .attr("fill", "none")
      .attr("stroke", "black");
  }
}

function dragged(e, d) {
  const circle = document.getElementById('circle_1');
  const text = document.getElementById('text_1');
  d3.select(this)
    .attr("x", e.x)
    .attr("y", e.y);
  drawLineBetweenTwoObjects(circle, text);
}

function BarChart({ data }) {
  const ref = useD3(
    (svg) => {
      svg
        .append('g')
        .attr('class', 'leader-group');

      svg
        .select('.leader-group')
        .append("circle")
        .attr("cx", 260)
        .attr("cy", 90)
        .attr("r", 6)
        .attr("id", 'circle_1')
        .style("fill", "#002D46");

      svg
        .select('.leader-group')
        .append("text")
        .attr("x", 270)
        .attr("y", 50)
        .text("Leaders")
        .attr("id", 'text_1')
        .style("font-size", "15px")
        .style("cursor", "grab")
        .attr("alignment-baseline", "middle")
        .call(d3.drag().on("drag", dragged));
    },
    []
  );

  return (
    <svg
      ref={ref}
      style={{
        height: 500,
        width: "100%",
        marginRight: "0px",
        marginLeft: "0px",
        border: "1px solid #000000"
      }}
    >
      <g className="plot-area" />
      <g className="x-axis" />
      <g className="y-axis" />
    </svg>
  );
}

export default BarChart;