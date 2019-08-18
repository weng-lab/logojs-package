import React from 'react';

const _path = `M 0 0 L 0 100 L 100 100 L 100 80
               L 20 80 L 20 0 L 0 0`;

export const L = props => (
    <path {...props} d={_path} />
);
