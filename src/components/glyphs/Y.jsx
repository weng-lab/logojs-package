import React from 'react';

const _path = `M 0 0 L 20 0 L 50 45 L 80 0 L 100 0
               L 60 60 L 60 100 L 40 100 L 40 60 L 0 0`;

export const Y = props => (
	<path {...props} d={_path} />
);
