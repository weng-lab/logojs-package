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

const _glyphmap = [
    { component: A, color: 'maroon' },
    { component: B, color: 'red' },
    { component: C, color: 'purple' },
    { component: D, color: 'green' },
    { component: E, color: 'olive' },
    { component: F, color: 'navy' },
    { component: G, color: 'teal' },
    { component: H, color: 'orange' },
    { component: I, color: 'cadetblue' },
    { component: K, color: 'chocolate' },
    { component: L, color: 'coral' },
    { component: M, color: 'darkolivegreen' },
    { component: N, color: 'darkorange' },
    { component: P, color: 'darkorchid' },
    { component: Q, color: 'darkslateblue' },
    { component: R, color: 'firebrick' },
    { component: S, color: 'darkslategrey' },
    { component: T, color: 'indianred' },
    { component: V, color: 'indigo' },
    { component: W, color: 'mediumseagreen' },
    { component: Y, color: 'palevioletred' },
    { component: Z, color: 'peru' }
];

const AALogo = ({ pwm, scale, startpos, mode }) => (
    <Logo pwm={pwm} glyphmap={_glyphmap} scale={scale}
      mode={mode} startpos={startpos} />
);
export default AALogo;
