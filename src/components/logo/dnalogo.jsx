import React from 'react';

import { A, C, G, T } from '../glyphs';
import Logo from './logo';

/**
 * Represents the DNA alphabet, with the four nucleotides colored
 * in a similar scheme to the MEME default.
 */
export const DNAAlphabet = [
    { component: A, regex: "A", color: "red" },
    { component: C, regex: "C", color: "blue" },
    { component: G, regex: "G", color: "orange" },
    { component: T, regex: "T", color: "#228b22" }
];

/**
 * Renders a logo with the DNA alphabet, with nucleotides colored similarly to the MEME default.
 *
 * @prop ppm position probability matrix. Rows are positions and should sum to 1.0; columns are nucleotides,
 *           alphabetically. If this is provided, it takes precedence over PFM in computing symbol heights.
 * @prop pfm position frequency matrix. Rows are positions and columns are nucleotides, alphabetically.
 * @prop mode the mode to use when computing letter heights; either information content or frequency.
 * @prop startpos number to assign the first position in the logo; defaults to 1.
 */
const DNALogo = props => (
    <Logo alphabet={DNAAlphabet} {...props} />
);
export default DNALogo;
