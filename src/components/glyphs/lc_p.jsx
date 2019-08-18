import React from 'react';

const p = props => (
    <g>
	<path d="M 20 100 L 0 100 L 0 0 L 20 0 L 20 20 C 10 -10 90 -10 100 30 L 100 40 C 90 90 10 90 20 60 L 20 60 L 20 100" {...props} />
	<path d="M 79 40 C 80 5 20 5 20 35 C 20 70 80 70 79 35" fill="#ffffff" />
    </g>
);
export default p;
