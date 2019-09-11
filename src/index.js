import Logo, { RawLogo } from './components/logo/logo';
import LogoWithNegatives from './components/logo/logowithnegatives';
import ProteinLogo, { ProteinAlphabet } from './components/logo/proteinlogo';
import DNALogo, { DNAAlphabet } from './components/logo/dnalogo';
import RNALogo, { RNAAlphabet } from './components/logo/rnalogo';
import CompleteLogo, { CompleteAlphabet } from './components/logo/completelogo';
import TestLogo from './components/logo/testlogo';
import { xrange, disymbolAlphabet, loadGlyphComponents } from './common/utils';
import { embedDNALogo, embedRNALogo, embedProteinLogo, embedLogo, embedRawLogo } from './js/embed';
import { INFORMATION_CONTENT, FREQUENCY } from './common/utils';

import { A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P,
	 Q, R, S, T, U, V, W, X, Y, Z, a, b, d, e, f, g, h,
	 i, j, k, l, m, n, p, q, r, t, u, y } from './components/glyphs';
import { N1, N2, N3, N4, N5, N6, N7, N8, N9 } from './components/glyphs';

const LC_a = a, LC_b = b, LC_c = C, LC_d = d, LC_e = e, LC_f = f, LC_g = g, LC_h = h,
      LC_i = i, LC_j = j, LC_k = k, LC_l = l, LC_m = m, LC_n = n, LC_o = O, LC_p = p,
      LC_q = q, LC_r = r, LC_s = S, LC_t = t, LC_u = u, LC_v = V, LC_w = W, LC_x = X,
      LC_y = y, LC_z = Z, N0 = O;

export { Logo, ProteinLogo, DNALogo, RNALogo, ProteinAlphabet, DNAAlphabet, RNAAlphabet,
	 CompleteLogo, CompleteAlphabet, INFORMATION_CONTENT, FREQUENCY, xrange,
	 LogoWithNegatives, embedDNALogo, disymbolAlphabet, RawLogo, embedRNALogo,
	 embedProteinLogo, embedLogo, embedRawLogo, loadGlyphComponents };

export { A, B, C, D, E, F, G, H, I, J, K, L, M, N, O, P,
	 Q, R, S, T, U, V, W, X, Y, Z, LC_a, LC_b, LC_c, LC_d, LC_e, LC_f, LC_g, LC_h,
	 LC_i, LC_j, LC_k, LC_l, LC_m, LC_n, LC_o, LC_p, LC_q, LC_r, LC_s, LC_t, LC_u,
	 LC_v, LC_w, LC_x, LC_y, LC_z, N0, N1, N2, N3, N4, N5, N6, N7, N8, N9 };
