import React from 'react';

const i = props => (
    <g>
        <rect {...props} x={40} y={20} width={20} height={80} />
	<rect {...props} x={40} y={0} width={20} height={15} />
    </g>
);
export default i;
