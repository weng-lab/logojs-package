import React from 'react';

const _path = `M 0 0 L 80 0 C 105 0 105 50 80 50
               C 105 50 105 100 80 100 L 00 100
               L 0 0`;

export const B = props => (
    <g>
        <path {...props} d={_path} />
        <path d="M 20 15 L 70 15 C 80 15 80 35 70 35 L 20 35 L 20 15" fill="#ffffff" />
        <path d="M 20 65 L 70 65 C 80 65 80 85 70 85 L 20 85 L 20 65" fill="#ffffff" />
    </g>
);
