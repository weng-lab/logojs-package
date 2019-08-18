import React from 'react';

const u = props => (
    <g>
	<path d="M 0 0 L 0 60 C 0 111 100 111 100 60 L 100 0 L 75 0 L 75 60 C 80 90 20 90 25 60 L 25 0 L 0 0" {...props} />
	<rect {...props} x={75} y={0} height={100} width={25} />
    </g>
);
export default u;
