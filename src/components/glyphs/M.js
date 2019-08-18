import React from 'react';

const _path = `M 0 0 L 20 0 L 50 35 L 80 0 L 100 0 L 100 100
               L 80 100 L 80 30 L 50 65 L 20 30 L 20 100
               L 0 100 L 0 0`;

export const M = props => (
    <path {...props} d={_path} />
);
