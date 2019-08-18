import React from 'react';

const _path = `M 0 100 L 0 0 L 20 0 L 80 75 L 80 0
         L 100 0 L 100 100 L 80 100 L 20 25 L 20 100 L 0 100`;

export const N = props => (
    <path {...props} d={_path} />
);
