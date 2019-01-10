import React from 'react';

import { A, C, G, U } from '../glyphs';
import Logo from './logo';

export const RNAGlyphmap = [
    { component: A, regex: "A", color: "red" },
    { component: C, regex: "C", color: "blue" },
    { component: G, regex: "G", color: "orange" },
    { component: U, regex: "U", color: "green" }
];

const RNALogo = ({ pwm, scale, startpos, mode }) => (
    <Logo pwm={pwm} glyphmap={RNAGlyphmap} scale={scale} startpos={startpos}
      mode={mode} />
);
export default RNALogo;
