const width = 800;
const height = 400;
const barPadding = 10;
let svg = d3.select('svg')
				.attr('width', width)
				.attr('height', height);

d3.select('#reset')
	.on('click', () => {
		d3.selectAll('.letter')
			.remove();
		d3.select('#phrase')
			.text('');
		d3.select('#count')
			.text('');
	})

d3.select('form')
	.on('submit', () => {
		d3.event.preventDefault();
		const input = d3.select('input');
		let text = input.property('value');
		let data = getFrequencies(text);
		let barWidth = width / data.length - barPadding;

		let letters = svg
			.selectAll('.letter')
			.data(data, d => d.character)

		letters
			.classed('new', false)
			.exit()
			.remove()

		letters
			.enter()
			.append('rect')
				.classed('letter', true)
				.classed('new', true)
			.merge(letters)
				.style('width', barWidth)
				.style('height', d => d.count * 20)
				.attr('x', (d, i) => (barWidth + barPadding) * i)
				.attr('y', d => height - d.count * 20);

		d3.select('#phrase')
			.text(`Analysis of: ${text}`);

		d3.select('#count')
			.text(`(New characters: ${letters.enter().nodes().length})`)

		input.property('value', '');
	});

function getFrequencies(str) {
	let sorted = str.split('').sort();
	let data = [];
	for(i = 0; i < sorted.length; i++) {
		let last = data[data.length - 1];
		if (last && last.character === sorted[i]) last.count++;
		else data.push({character: sorted[i], count: 1});
	}
	return data;
}

// getFrequencies('hello'); [{chracter: e, count: 1}, ..., {character: 'o', count: 1}]



















