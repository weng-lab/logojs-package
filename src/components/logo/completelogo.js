import React from 'react';

import { A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P,
	 Q, R, S, T, U, V, W, X, Y, Z } from '../glyphs';
import Logo from './logo';

export const CompleteGlyphmap = [
    { component: A, regex: "A", color: 'maroon' },
    { component: B, regex: "B", color: 'red' },
    { component: C, regex: "C", color: 'purple' },
    { component: D, regex: "D", color: 'green' },
    { component: E, regex: "E", color: 'olive' },
    { component: F, regex: "F", color: 'navy' },
    { component: G, regex: "G", color: 'teal' },
    { component: H, regex: "H", color: 'orange' },
    { component: I, regex: "I", color: 'cadetblue' },
    { component: J, regex: "J", color: 'lavender' },
    { component: K, regex: "K", color: 'chocolate' },
    { component: L, regex: "L", color: 'coral' },
    { component: M, regex: "M", color: 'darkolivegreen' },
    { component: N, regex: "N", color: 'darkorange' },
    { component: O, regex: "O", color: 'gold' },
    { component: P, regex: "P", color: 'darkorchid' },
    { component: Q, regex: "Q", color: 'darkslateblue' },
    { component: R, regex: "R", color: 'firebrick' },
    { component: S, regex: "S", color: 'darkslategrey' },
    { component: T, regex: "T", color: 'indianred' },
    { component: U, regex: "U", color: 'darkkhaki' },
    { component: V, regex: "V", color: 'indigo' },
    { component: W, regex: "W", color: 'mediumseagreen' },
    { component: X, regex: "X", color: 'black' },
    { component: Y, regex: "Y", color: 'palevioletred' },
    { component: Z, regex: "Z", color: 'peru' }
];

const CompleteLogo = ({ pwm, scale, startpos, mode }) => (
    <Logo pwm={pwm} glyphmap={CompleteGlyphmap} scale={scale}
      mode={mode} startpos={startpos} />
);
export default CompleteLogo;
