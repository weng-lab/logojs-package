import React from 'react';

const _path = `M 0 0 L 0 20 L 35 20 L 35 100
         L 65 100 L 65 20 L 100 20
         L 100 0 L 0 0`;

export const T = props => (
    <path {...props} d={_path} />
);
