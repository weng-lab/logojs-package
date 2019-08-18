import React from 'react';

const _path = `M 0 0 L 20 0 L 30 70 L 50 30 L 70 70 L 80 0
               L 100 0 L 90 100 L 70 100 L 50 65 L 30 100
               L 10 100 L 0 0`;

export const W = props => (
	<path {...props} d={_path} />
);
