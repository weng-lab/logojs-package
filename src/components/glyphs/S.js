import React from 'react';

const _path = `M92 26 A43 20 0 1 0 43 46 A42 23 0 1 1 9 68`;

export const S = ({ fill }) => (
    <path fill="#ffffff" stroke={fill} strokeWidth="18" d={_path} />
);
