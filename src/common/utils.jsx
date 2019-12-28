import { CompleteAlphabet } from '../components/logo/completelogo';

export const INFORMATION_CONTENT = 'INFORMATION_CONTENT';
export const FREQUENCY = 'FREQUENCY';

export const maxLabelLength = (startpos, length) => {
    let max = ("" + startpos).length;
    for (let i = startpos + 1; i < startpos + length; ++i)
        if (("" + i).length > max) max = ("" + i).length;
    return max;
};

const regexMap = ( () => {
    let r = {};
    CompleteAlphabet.forEach(glyph => {
	r[glyph.regex] = glyph;
    });
    return r;
})();

/**
 * Populates a alphabet with the appropriate components for rendering its symbols.
 * Each entry should have a regex field listing the symbols it renders; these may
 * be a single character or multiple. Supported symbols are A-Z, a-z, and 0-9.
 *
 * @param alphabet the symbol list to populate; array of objects with regex and color fields.
 */
export const loadGlyphComponents = alphabet => (
    alphabet.map( glyph => {
	if (glyph.regex.length === 1)
	    return Object.assign({}, glyph, { component: regexMap[glyph.regex].component });
        const color = (glyph.color && glyph.color.map && glyph.color.length >= 1 ? glyph.color[0] : glyph.color) || "#000000";
	let r = Object.assign({}, glyph, { component: [], color: glyph.color && glyph.color.map && glyph.color.length === glyph.regex.length ? glyph.color : [] });
	for (let i = 0; i < r.regex.length; ++i) {
	    r.component.push(regexMap[r.regex[i]].component);
	    if (r.color.length === i) r.color.push(color);
	}
	return r;
    })
);

export const logLikelihood = backgroundFrequencies => r => {
    let sum = 0.0;
    r.map( (x, i) => ( sum += x === 0 ? 0 : x * Math.log2(x / (backgroundFrequencies[i] || 0.01)) ) );
    return r.map( x => x * sum );
};

export const sortedIndices = x => {
    let indices = x.map( (_, i) => i);
    return indices.sort( (a, b) => (
	x[a] < x[b] ? -1 : (x[a] === x[b] ? 0 : 1)
    ));
}

export const sortedIndicesNegative = x => {
    let indices = x.map( (_, i) => i);
    return indices.sort( (a, b) => (
	x[a] < x[b] ? 1 : (x[a] === x[b] ? 0 : -1)
    ));
}

export const xrange = n => (
    [...Array(Math.floor(n)).keys()]
);

export const onehot = l => x => (
    xrange(l).map( (_, i) => i === x ? 1 : 0 )
);

export const possum = x => {
    let s = 0.0;
    x.filter(x => x > 0.0).forEach(x => { s += x });
    return s;
};

export const negsum = x => {
    let s = 0.0;
    x.filter(x => x < 0.0).forEach(x => { s += x });
    return s;
};

export const disymbolAlphabet = x => (
    x.reduce( (ci, ix) => (
	[ ...ci, ...x.reduce( (cj, jx) => (
	    [...cj, {
		component: [ ix.component, jx.component ],
		color: [ ix.color, jx.color ],
		regex: ix.regex + jx.regex
	    }]
	), []) ]
    ), [])
);

const validHex = color => {

    /* validate color is a hex color */
    color = String(color).replace(/[^0-9a-f]/gi, '');
    if (color.length === 3)
        color = color[0] + color[0] + color[1] + color[1] + color[2] + color[2];
    if (color.length === 8)
        color = color.substring(0, 6);
    if (color.length !== 6) throw new Error(color + " is not a valid hex color");

    /* return the first 6 hex digits */
    return color;
    
};

/**
 * Validates a hex color and parses it to an integer.
 *
 * @param color the color as a hex string (e.g. #fff or ABCDEF)
 */
export const parseHex = color => (
    parseInt(validHex(color), 16)
);
