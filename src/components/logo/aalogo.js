import React from 'react';

import { A, B, C, D, E, F, G, H, I, K, L, M, N, P,
	 Q, R, S, T, V, W, X, Y, Z } from '../glyphs';
import Logo from './logo';

export const AAGlyphmap = [
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

const AALogo = ({ pwm, scale, startpos, mode }) => (
    <Logo pwm={pwm} glyphmap={AAGlyphmap} scale={scale}
      mode={mode} startpos={startpos} />
);
export default AALogo;
