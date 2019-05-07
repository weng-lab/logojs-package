import React from 'react';

import { A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P,
	 Q, R, S, T, U, V, W, X, Y, Z } from '../glyphs';
import { a, b, d, e, f, g, h, i, j, k, l, m, n, p,
	 q, r, t, u, y } from '../glyphs';
import { N1, N2, N3, N7, N8 } from '../glyphs';
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
    { component: Z, regex: "Z", color: 'peru' },
    { component: a, regex: "a", color: 'maroon' },
    { component: b, regex: "b", color: 'red' },
    { component: C, regex: "c", color: 'purple' },
    { component: d, regex: "d", color: 'green' },
    { component: e, regex: "e", color: 'olive' },
    { component: f, regex: "f", color: 'navy' },
    { component: g, regex: "g", color: 'teal' },
    { component: h, regex: "h", color: 'orange' },
    { component: i, regex: "i", color: 'cadetblue' },
    { component: j, regex: "j", color: 'lavender' },
    { component: k, regex: "k", color: 'chocolate' },
    { component: l, regex: "l", color: 'coral' },
    { component: m, regex: "m", color: 'darkolivegreen' },
    { component: n, regex: "n", color: 'darkorange' },
    { component: O, regex: "o", color: 'gold' },
    { component: p, regex: "p", color: 'darkorchid' },
    { component: q, regex: "q", color: 'darkslateblue' },
    { component: r, regex: "r", color: 'firebrick' },
    { component: S, regex: "s", color: 'darkslategrey' },
    { component: t, regex: "t", color: 'indianred' },
    { component: u, regex: "u", color: 'darkkhaki' },
    { component: V, regex: "v", color: 'indigo' },
    { component: W, regex: "w", color: 'mediumseagreen' },
    { component: X, regex: "x", color: 'black' },
    { component: y, regex: "y", color: 'palevioletred' },
    { component: Z, regex: "z", color: 'peru' },
    { component: N1, regex: "1", color: 'red' },
    { component: N2, regex: "2", color: "green" },
    { component: N3, regex: "3", color: "blue" },
    { component: N7, regex: "7", color: "gold" },
    { component: N8, regex: "8", color: "slate" }
];

const CompleteLogo = ({ pwm, scale, startpos, mode }) => (
    <Logo pwm={pwm} glyphmap={CompleteGlyphmap} scale={scale}
      mode={mode} startpos={startpos} />
);
export default CompleteLogo;
