import React from 'react';

import { A } from '../glyphs/A';
import { C } from '../glyphs/C';
import { G } from '../glyphs/G';
import { U } from '../glyphs/U';

import Logo from './logo';

const _glyphmap = [
    { component: A, color: "red" },
    { component: C, color: "blue" },
    { component: G, color: "orange" },
    { component: U, color: "green" }
];

const RNALogo = ({ pwm, scale, startpos, mode }) => (
    <Logo pwm={pwm} glyphmap={_glyphmap} scale={scale} startpos={startpos}
      mode={mode} />
);
export default RNALogo;
