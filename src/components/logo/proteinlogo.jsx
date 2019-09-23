import React from 'react';

import { A, B, C, D, E, F, G, H, I, K, L, M, N, P,
	 Q, R, S, T, V, W, X, Y, Z } from '../glyphs';
import Logo from './logo';

/**
 * Represents the protein alphabet, with 22 amino acids plus B and Z
 * for N/D and Q/E. Acidic amino acids are red shades, basic amino acids
 * are blue shades, non-polar amino acids are black shades, and B and Z
 * are gold shades.
 */
export const ProteinAlphabet = [
    { component: A, regex: "A", color: 'black' },
    { component: B, regex: "B", color: '#bb8800' },
    { component: C, regex: "C", color: '#008811' },
    { component: D, regex: "D", color: '#ff0000' },
    { component: E, regex: "E", color: '#ff0022' },
    { component: F, regex: "F", color: '#333333' },
    { component: G, regex: "G", color: '#007700' },
    { component: H, regex: "H", color: '#220099' },
    { component: I, regex: "I", color: '#111111' },
    { component: K, regex: "K", color: '#0000aa' },
    { component: L, regex: "L", color: '#002222' },
    { component: M, regex: "M", color: '#220022' },
    { component: N, regex: "N", color: '#009911' },
    { component: P, regex: "P", color: '#080808' },
    { component: Q, regex: "Q", color: '#00aa00' },
    { component: R, regex: "R", color: '#0022aa' },
    { component: S, regex: "S", color: '#008f00' },
    { component: T, regex: "T", color: '#006600' },
    { component: V, regex: "V", color: '#222200' },
    { component: W, regex: "W", color: '#080808' },
    { component: Y, regex: "Y", color: '#00a800' },
    { component: Z, regex: "Z", color: '#aaaa00' }
];

/**
 * Renders a logo with the protein alphabet, with amino acids colored according
 * to chemical properties (acidic, basic, and non-polar are red, blue, and black
 * shades, respectively).
 *
 * @prop ppm position probability matrix. Rows are positions and should sum to 1.0; columns are nucleotides,
 *           alphabetically. If this is provided, it takes precedence over PFM in computing symbol heights.
 * @prop pfm position frequency matrix. Rows are positions and columns are nucleotides, alphabetically.
 * @prop mode the mode to use when computing letter heights; either information content or frequency.
 * @prop startpos number to assign the first position in the logo; defaults to 1.
 * @prop yAxisMax if set, uses an explicit maximum value for the y-axis rather than the total number of bits possible. This is ignored in FREQUENCY mode.
 */
const ProteinLogo = props => (
    <Logo alphabet={ProteinAlphabet} {...props} />
);
export default ProteinLogo;
