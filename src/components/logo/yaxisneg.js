import React from 'react';

import { xrange } from '../../common/utils';

class YAxisWithNegatives extends React.Component {

    render() {
	let ticks = [ this.props.min, 0, this.props.max ];
	return (
	    <g transform={this.props.transform}>
		<rect height={this.props.height} width={4} x={this.props.width + 1} y="0"
	          fill="#000000" />
		{ticks.map( x => (
		  <g key={x} transform={"translate(0," + ((this.props.height - x / this.props.max * this.props.height) / 2.0) + ")"}>
		      <text x={this.props.width - 10} textAnchor="end" y="4" fontSize="18">{(x + '').substring(0, 4)}</text>
		      <rect x={this.props.width - 5} width="10" height="4" y="-2" fill="#000000" />
		  </g>
		))}
	        <g transform="rotate(-90)">
		    <text y="15" x={-this.props.height / 2} textAnchor="middle" fontSize="18">frequency</text>
		</g>
	    </g>
	);
    }
    
};
export default YAxisWithNegatives;
