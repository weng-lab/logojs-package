import React from 'react';

const _path = `M 0 0 L 80 0 C 105 0 105 50 80 50
                C 100 50 100 70 100 70 L 100 100 L 80 100
                L 80 80 C 80 80 80 60 50 60 L 20 60
                L 20 100 L 0 100 L 0 0`;

export const R = props => (
    <g>
        <path {...props} d={_path} />
        <path fill="#ffffff" d="M 20 15 L 70 15 C 80 15 80 35 70 35 L 20 35 L 20 15" />
    </g>
);
