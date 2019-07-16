import React from 'react';

import Glyph from '../glyphs/glyph';

const GlyphStack = ({ height, width, indices, glyphmap, lv, transform }) => {
    
    /* move up from bottom */
    let cy = height; // start from bottom with smallest letter
    let xscale = width / 100.0; // scale to glyphs' 100x100 viewport
    
    /* stack glyphs in order */
    let glyphs = indices.map( index => {
	if (!glyphmap[index]) { return null; }
	if (lv[index] === 0.0) { return null; }
	let G = glyphmap[index].component;
	cy -= lv[index] * 100.0;
	return (
            <g transform={"translate(0," + cy + ")"} key={index}>
		<Glyph xscale={xscale} yscale={lv[index]}>
		    <G fill={glyphmap[index].color} />
		</Glyph>
	    </g>
	);
    });
    
    /* wrap glyphs in g */
    return (
	<g transform={transform}>{glyphs}</g>
    );
        
};
export default GlyphStack;
