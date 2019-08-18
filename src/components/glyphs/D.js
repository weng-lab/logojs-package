import React from 'react';

const _path = `M 0 0 L 60 0 C 110 0 110 100 60 100
               L 0 100 L 0 0`;
const _innerpath = `M 20 15 L 40 15 C 85 15 85 85 40 85
                    L 20 85 L 20 15`;

export const D = props => (
    <g>
        <path {...props} d={_path} />
        <path fill="#ffffff" d={_innerpath} />
    </g>
);
