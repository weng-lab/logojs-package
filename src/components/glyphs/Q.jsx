import React from 'react';

const _path = `M 85 100 L 55 70 L 70 55 L 100 85 L 85 100`;

export const Q = props => (
    <g>
        <circle cx="50" cy="50" r="50" {...props} />
        <circle cx="50" cy="50" r="32" fill="#ffffff" />
        <path d={_path} {...props} />
    </g>
);
