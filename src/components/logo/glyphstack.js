import React from 'react';

import Glyph from '../glyphs/glyph';

const GlyphStack = ({ height, width, indices, glyphmap, lv, transform }) => {
    
    /* move up from bottom */
    let cy = height; // start from bottom with smallest letter
    let xscale = width / 100.0; // scale to glyphs' 100x100 viewport
    
    /* stack glyphs in order */
    let glyphs = indices.map( index => {
	
	if (!glyphmap[index] || !glyphmap[index].component) { return null; }
	if (lv[index] === 0.0) { return null; }

	cy -= lv[index] * 100.0;
	
	if (!glyphmap[index].component.map) {
	    let G = glyphmap[index].component;
	    return (
              <g transform={"translate(0," + cy + ")"} key={index}>
	        <Glyph xscale={xscale} yscale={lv[index]}>
	          <G fill={glyphmap[index].color} />
	        </Glyph>
	      </g>
	    );
	}

	let _xscale = xscale / glyphmap[index].component.length;
	return glyphmap[index].component.map( (G, i) => (
	  <g transform={"translate(" + (i * width / glyphmap[index].component.length) + "," + cy + ")"} key={index + "_" + i}>
	    <Glyph xscale={_xscale} yscale={lv[index]}>
	      <G fill={glyphmap[index].color} />
	    </Glyph>
	  </g>	    
	));
	
    });
    
    /* wrap glyphs in g */
    return (
	<g transform={transform}>{glyphs}</g>
    );
        
};
export default GlyphStack;
