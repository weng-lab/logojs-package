import React from 'react';

const _path = `M 0 0 L 20 0 L 20 40 L 75 0 L 100 0
               L 50 50 L 100 100 L 75 100 L 30 65
               L 20 75 L 20 100 L 0 100 L 0 0`;

export const K = props => (
    <path {...props} d={_path} />
);
