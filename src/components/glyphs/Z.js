import React from 'react';

const _path = `M 0 0 L 100 0 L 100 20 L 35 80 L 100 80
               L 100 100 L 0 100 L 0 80 L 65 20 L 0 20
               L 0 0`;

export const Z = props => (
	<path {...props} d={_path} />
);
