import React from 'react';

import { xrange } from '../../common/utils';

class XAxis extends React.Component {

    render() {
	let numbers = xrange(this.props.n);
	return (
	    <g transform={this.props.transform}>
	        <g transform="rotate(-90)">
		    {numbers.map( n => (
		      <text x="0" y={this.props.glyphWidth * (n + 0.66)}
		        textAnchor="end" key={n}>{n + this.props.startpos}</text>
		    ))}
		</g>
   	    </g>
	);
    }
    
};
export default XAxis;
