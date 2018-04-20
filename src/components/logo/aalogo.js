import React from 'react';

import { A } from '../glyphs/A';
import { B } from '../glyphs/B';
import { C } from '../glyphs/C';
import { D } from '../glyphs/D';
import { E } from '../glyphs/E';
import { F } from '../glyphs/F';
import { G } from '../glyphs/G';
import { H } from '../glyphs/H';
import { I } from '../glyphs/I';
import { K } from '../glyphs/K';
import { L } from '../glyphs/L';
import { M } from '../glyphs/M';
import { N } from '../glyphs/N';
import { P } from '../glyphs/P';
import { Q } from '../glyphs/Q';
import { R } from '../glyphs/R';
import { S } from '../glyphs/S';
import { T } from '../glyphs/T';
import { V } from '../glyphs/V';
import { W } from '../glyphs/W';
import { Y } from '../glyphs/Y';
import { Z } from '../glyphs/Z';

import Logo from './logo';

export const AAGlyphmap = [
    { component: A, regex: "A", color: 'maroon' },
    { component: B, regex: "B", color: 'red' },
    { component: C, regex: "C", color: 'purple' },
    { component: D, regex: "D", color: 'green' },
    { component: E, regex: "E", color: 'olive' },
    { component: F, regex: "F", color: 'navy' },
    { component: G, regex: "G", color: 'teal' },
    { component: H, regex: "H", color: 'orange' },
    { component: I, regex: "I", color: 'cadetblue' },
    { component: K, regex: "K", color: 'chocolate' },
    { component: L, regex: "L", color: 'coral' },
    { component: M, regex: "M", color: 'darkolivegreen' },
    { component: N, regex: "N", color: 'darkorange' },
    { component: P, regex: "P", color: 'darkorchid' },
    { component: Q, regex: "Q", color: 'darkslateblue' },
    { component: R, regex: "R", color: 'firebrick' },
    { component: S, regex: "S", color: 'darkslategrey' },
    { component: T, regex: "T", color: 'indianred' },
    { component: V, regex: "V", color: 'indigo' },
    { component: W, regex: "W", color: 'mediumseagreen' },
    { component: Y, regex: "Y", color: 'palevioletred' },
    { component: Z, regex: "Z", color: 'peru' }
];

const AALogo = ({ pwm, scale, startpos, mode }) => (
    <Logo pwm={pwm} glyphmap={AAGlyphmap} scale={scale}
      mode={mode} startpos={startpos} />
);
export default AALogo;
