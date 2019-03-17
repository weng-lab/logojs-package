import React from 'react';

import { sortedIndices, sortedIndicesNegative, possum, negsum } from '../../common/utils';
import GlyphStack from './glyphstack';
import XAxis from './xaxis';
import YAxis from './yaxis';
import YAxisWithNegatives from './yaxisneg';
import { YGridlines } from './ygridlines';

const _position = (width, height) => (lv, transform, key, glyphmap, negative) => {
    let indices = negative ? sortedIndicesNegative(lv) : sortedIndices(lv); // tallest on top
    return (
	<GlyphStack indices={indices} glyphmap={glyphmap}
	  lv={lv} transform={transform} width={width} height={height}
	  key={key} />
    );
};

const LogoWithNegatives = ({ pwm, mode, height, width, glyphmap, scale, startpos, showGridLines = false }) => {

    /* compute likelihood; need at least one entry to continue */
    if (pwm.length === 0 || pwm[0].length === 0) {
	return <div />;
    }
    let alphabetSize = pwm[0].length;

    /* misc options */
    startpos = (startpos !== null ? startpos : 1);

    /* compute scaling factors */
    let maxes = pwm.map(possum);
    let mins = pwm.map(x => -negsum(x));
    let mvalue = Math.max(...maxes, ...mins);
    let maxHeight = 200.0;
    let glyphWidth = maxHeight / 6.0;

    /* compute viewBox */
    let viewBoxW = pwm.length * glyphWidth + 80;
    let viewBoxH = maxHeight + 120;
    let gposition = _position(glyphWidth, maxHeight / 2);
    let nposition = _position(glyphWidth, -maxHeight / 2);
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
                    numberofgridlines: 10 * pwm.length //10 grid lines per glyph
                }} />
        )}
        <XAxis transform={'translate(80,' + (maxHeight + 20) + ')'} n={pwm.length}
	      glyphWidth={glyphWidth} startpos={startpos} />
	    {<YAxisWithNegatives transform="translate(0,10)" width={65} height={maxHeight} min={-mvalue} max={mvalue} />}
            <g transform="translate(80,10)">
                {pwm.map((lv, i) =>
		    gposition(lv.map(x => x > 0.0 ? x / mvalue : 0.0), 'translate(' + glyphWidth * i + ',0)', i, glyphmap)
	        )}
	        {pwm.map((lv, i) =>
		    nposition(lv.map(x => x < 0.0 ? x / mvalue : 0.0), 'translate(' + glyphWidth * i + ',' + maxHeight + ')', i, glyphmap, true)
                )}
            </g>           
    </svg>
    );
    
};
export default LogoWithNegatives;
