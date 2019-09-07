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
 * @prop pwm matrix containing values; rows are positions, columns are nucleotides, alphabetically.
 * @prop mode the mode to use when computing letter heights; either information content or frequency.
 * @prop startpos number to assign the first position in the logo; defaults to 1.
 */
const RNALogo = props => (
    <Logo alphabet={RNAAlphabet} {...props} />
);
export default RNALogo;
