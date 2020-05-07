const width = 600;
const height = 600;
const padding = 50;

const data = regionData.filter(mustHaveKeys);

const xScale = d3.scaleLinear()
				 .domain(d3.extent(data, d => d.adultLiteracyRate))
				 .range([padding, width - padding]);

const yScale = d3.scaleLinear()
				 .domain(d3.extent(data, d => d.subscribersPer100))
				 .range([height - padding, padding]);

const rScale = d3.scaleLinear()
				 .domain(d3.extent(data, d => d.medianAge))
			 	 .range([5, 30]);

const fScale = d3.scaleLinear()
				 .domain(d3.extent(data, d => d.urbanPopulationRate))
				 .range(['green', 'blue']);

const xAxis = d3.axisBottom(xScale)
				.tickSize(- height + 2 * padding)
				.tickSizeOuter(0)

const yAxis = d3.axisLeft(yScale)
				.tickSize(- width + 2 * padding)
				.tickSizeOuter(0)

const svg = d3.select('svg')
			  .attr('width', width)
			  .attr('height', height);

svg.append('g')
   .attr('transform', `translate(0, ${height - padding})`)
   .call(xAxis);

svg.append('g')
   .attr('transform', `translate(${padding}, 0)`)
   .call(yAxis);

svg.append('text')
   .attr('x', width / 2)
   .attr('y', (height - padding))
   .attr('dy', padding / 2)
   .style('text-anchor', 'middle')
   .text('Literacy Rate, Aged 15 and Up')

svg.append('text')
   .attr('transform', 'rotate(-90)')
   .attr('x', - height / 2)
   .attr('dy', padding / 2)
   .style('text-anchor', 'middle')
   .text('Cellular Subsrcibers per 100 People')

svg
	.selectAll('circle')
	.data(data)
	.enter()
	.append('circle')
		.attr('cx', d => xScale(d.adultLiteracyRate))
		.attr('cy', d => yScale(d.subscribersPer100))
		.attr('r', d => rScale(d.medianAge))
		.attr('fill', d => fScale(d.urbanPopulationRate))
		.attr('stroke', '#fff');

svg.append('text')
   .attr('x', width / 2)
   .attr('dy', '1em')
   .style('text-anchor', 'middle')
   .style('font-size', '2em')
   .text('Cellular Subscriptions vs. Literacy Rate')

function mustHaveKeys(obj) {
	const keys = [
		'subscribersPer100',
		'adultLiteracyRate',
		'medianAge',
		'urbanPopulationRate'
	];
	for(i = 0; i < keys.length; i++) {
		if(obj[keys[i]] === null) return false
	}
	return true
}

























