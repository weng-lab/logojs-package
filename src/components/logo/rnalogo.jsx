import React from 'react';

import { A, C, G, U } from '../glyphs';
import Logo from './logo';

/**
 * Represents the RNA alphabet, with the four nucleotides colored
 * in a similar scheme to the MEME default (U is green like T).
 */
export const RNAAlphabet = [
    { component: A, regex: "A", color: "red" },
    { component: C, regex: "C", color: "blue" },
    { component: G, regex: "G", color: "orange" },
    { component: U, regex: "U", color: "#228b22" }
];

/**
 * Renders a logo with the RNA alphabet, with nucleotides colored similarly to the MEME default.
 *
 * @prop ppm position probability matrix. Rows are positions and should sum to 1.0; columns are nucleotides,
 *           alphabetically. If this is provided, it takes precedence over PFM in computing symbol heights.
 * @prop pfm position frequency matrix. Rows are positions and columns are nucleotides, alphabetically.
 * @prop mode the mode to use when computing letter heights; either information content or frequency.
 * @prop startpos number to assign the first position in the logo; defaults to 1.
 * @prop yAxisMax if set, uses an explicit maximum value for the y-axis rather than the total number of bits possible. This is ignored in FREQUENCY mode.
 */
const RNALogo = props => (
    <Logo alphabet={RNAAlphabet} {...props} />
);
export default RNALogo;
