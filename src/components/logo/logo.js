import React from 'react';

import { logLikelihood, sortedIndices, FREQUENCY } from '../../common/utils';
import GlyphStack from './glyphstack';
import XAxis from './xaxis';
import YAxis from './yaxis';
import YAxisFrequency from './yaxisfreq';
import { YGridlines } from './ygridlines';

const _position = (width, height) => (lv, transform, key, glyphmap) => {
    let indices = sortedIndices(lv); // tallest on top
    return (
	<GlyphStack indices={indices} glyphmap={glyphmap}
	  lv={lv} transform={transform} width={width} height={height}
	  key={key} />
    );
};

const Logo = ({ pwm, mode, height, width, glyphmap, scale, startpos, showGridLines = false }) => {

    /* compute likelihood; need at least one entry to continue */
    if (pwm.length === 0 || pwm[0].length === 0) {
	return <div />;
    }
    let alphabetSize = pwm[0].length;
    let likelihood = ( mode !== FREQUENCY
		       ? pwm.map(logLikelihood(glyphmap.length))
		       : pwm.map(x => x.map(v => v * Math.log2(alphabetSize))) );
    
    /* misc options */
    startpos = startpos || 1;

    /* compute scaling factors */
    let maxHeight = 100.0 * Math.log2(alphabetSize);
    let glyphWidth = maxHeight / 6.0;
    
    /* compute viewBox */
    let viewBoxW = likelihood.length * glyphWidth + 80;
    let viewBoxH = maxHeight + 120;
    let gposition = _position(glyphWidth, maxHeight);
    if (scale)
	viewBoxW > viewBoxH ? width = scale : height = scale;

    return (
	<svg width={width} height={height} viewBox={'0 0 ' + viewBoxW + ' ' + viewBoxH}>
        {showGridLines && (
            <YGridlines
                {...{
                    minrange: startpos,
                    maxrange: startpos + pwm.length,
                    xstart: 70,
                    width: viewBoxW,
                    height: maxHeight,
                    xaxis_y: 10,
                    numberofgridlines: 10 * likelihood.length //10 grid lines per glyph
                }} />
        )}
        <XAxis transform={'translate(80,' + (maxHeight + 20) + ')'} n={likelihood.length}
	      glyphWidth={glyphWidth} startpos={startpos} />
	    { mode === FREQUENCY
	      ? <YAxisFrequency transform="translate(0,10)" width={65} height={maxHeight} ticks={2} />
              : <YAxis transform="translate(0,10)" width={65} height={maxHeight} bits={maxHeight / 100.0} /> }
            <g transform="translate(80,10)">
                {likelihood.map((lv, i) =>
	            gposition(lv, 'translate(' + glyphWidth * i + ',0)', i, glyphmap)
                )}
            </g>           
    </svg>
    );
	
};
export default Logo;
