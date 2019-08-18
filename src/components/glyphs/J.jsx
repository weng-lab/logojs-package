import React from 'react';

const _path = `M 0 60 C 0 111 100 111 100 60
         L 100 0 L 75 0 L 75 60
         C 80 90 20 90 25 60`;

export const J = props => (
    <path {...props} d={_path} />
);
