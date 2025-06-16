import { CompleteAlphabet } from "../components/logo/completelogo";
import { Alphabet, Symbol } from "../components/logo/types";

export const INFORMATION_CONTENT = "INFORMATION_CONTENT";
export const FREQUENCY = "FREQUENCY";

export const maxLabelLength = (startpos: number, length: number) => {
  let max = ("" + startpos).length;
  for (let i = startpos + 1; i < startpos + length; ++i) if (("" + i).length > max) max = ("" + i).length;
  return max;
};

const regexMap = (() => {
  let r: Record<string, Symbol> = {};
  CompleteAlphabet.forEach((glyph: Symbol) => {
    r[glyph.regex] = glyph;
  });
  return r;
})();

/**
 * Populates a alphabet with the appropriate components for rendering its symbols.
 * Each entry should have a regex field listing the symbols it renders; these may
 * be a single character or multiple. Supported symbols are A-Z, a-z, and 0-9.
 *
 * @param alphabet the symbol list to populate; array of objects with regex and color fields.
 */
export const loadGlyphComponents = (alphabet: Alphabet) =>
  alphabet.map((glyph: Symbol) => {
    if (glyph.regex.length === 1) return Object.assign({}, glyph, { component: regexMap[glyph.regex].component });
    const defaultColor = "#000000";
    const color = Array.isArray(glyph.color)
      ? glyph.color[0] || defaultColor
      : typeof glyph.color === "string" && glyph.color.length >= 1
      ? glyph.color[0]
      : defaultColor;
    let r = Object.assign({}, glyph, {
      component: [] as React.ComponentType[],
      color: Array.isArray(glyph.color)
        ? [...glyph.color]
        : typeof glyph.color === "string" && glyph.color.length === glyph.regex.length
        ? glyph.color.split("")
        : ([] as string[]),
    });
    for (let i = 0; i < r.regex.length; ++i) {
      r.component.push(regexMap[r.regex[i]].component);
      if (r.color.length === i) r.color.push(color);
    }
    return r;
  });

export const logLikelihood = (backgroundFrequencies: number[]) => (r: number[], e: number) => {
  let sum = 0.0;
  const es = e || 0.0;
  r.map((x, i) => (sum += x === 0 ? 0 : x * Math.log2(x / (backgroundFrequencies[i] || 0.01))));
  return r.map((x: number) => {
    const v = x * (sum - es);
    return v <= 0.0 ? 0.0 : v;
  });
};

export const sortedIndices = (x: number[]) => {
  const indices = x.map((_, i) => i);
  return indices.sort((a, b) => (x[a] < x[b] ? -1 : x[a] === x[b] ? 0 : 1));
};

export const sortedIndicesNegative = (x: number[]) => {
  const indices = x.map((_, i) => i);
  return indices.sort((a, b) => (x[a] < x[b] ? 1 : x[a] === x[b] ? 0 : -1));
};

export const xrange = (n: number) => [...Array(Math.floor(n)).keys()];

export const onehot = (l: number) => (x: number) => xrange(l).map((_, i) => (i === x ? 1 : 0));

export const possum = (x: number[]) => {
  let s = 0.0;
  x.filter((x: number) => x > 0.0).forEach((x: number) => {
    s += x;
  });
  return s;
};

export const negsum = (x: number[]) => {
  let s = 0.0;
  x.filter((x: number) => x < 0.0).forEach((x: number) => {
    s += x;
  });
  return s;
};

export const disymbolAlphabet = (x: any) =>
  x.reduce(
    (ci: any, ix: any) => [
      ...ci,
      ...x.reduce(
        (cj: any, jx: any) => [
          ...cj,
          {
            component: [ix.component, jx.component],
            color: [ix.color, jx.color],
            regex: ix.regex + jx.regex,
          },
        ],
        []
      ),
    ],
    []
  );

const validHex = (color: string) => {
  /* validate color is a hex color */
  color = String(color).replace(/[^0-9a-f]/gi, "");
  if (color.length === 3) color = color[0] + color[0] + color[1] + color[1] + color[2] + color[2];
  if (color.length === 8) color = color.substring(0, 6);
  if (color.length !== 6) throw new Error(color + " is not a valid hex color");

  /* return the first 6 hex digits */
  return color;
};

/**
 * Validates a hex color and parses it to an integer.
 *
 * @param color the color as a hex string (e.g. #fff or ABCDEF)
 */
export const parseHex = (color: string) => parseInt(validHex(color), 16);
