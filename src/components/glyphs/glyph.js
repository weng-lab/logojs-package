import React from 'react';

class Glyph extends React.Component {

    render() {
	let yscale = this.props.yscale * (this.props.inverted ? -1 : 1);
	return (
	    <g transform={"scale(" + this.props.xscale + "," + yscale + ")"}>
		{this.props.children}
	    </g>
	);
    }
    
};
export default Glyph;
