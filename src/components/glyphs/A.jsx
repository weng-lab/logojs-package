import React from 'react';

const _path = `M 0 100 L 33 0 L 66 0 L 100 100 L 75 100
         L 66 75 L 33 75 L 25 100 L 0 100`;

export const A = props => (
    <g>
        <path {...props} d={_path} />
	<path fill="#ffffff" d="M 41 55 L 50 25 L 58 55 L 41 55" />
    </g>
);
