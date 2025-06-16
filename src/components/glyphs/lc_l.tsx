import React from 'react';

const l = (props: React.SVGProps<SVGRectElement>) => (
    <rect x={40} y={0} width={20} height={100} {...props} />
);
export default l;
