import React from 'react';

const j = props => (
    <g>
	<path d="M 0 60 C 0 115 100 115 100 60 L 100 20 L 80 20 L 80 60 C 80 90 20 90 25 60" {...props} />
	<rect x={80} width={20} height={15} {...props} />
    </g>
);
export default j;
