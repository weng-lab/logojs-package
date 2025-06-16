import Glyph from "../glyphs/glyph";

export interface GlyphStackProps {
  height: number;
  width: number;
  indices: number[];
  alphabet: any;
  lv: number[];
  transform: string;
  alpha?: number;
  inverted?: boolean;
  onSymbolMouseOver: ((symbol: string) => any) | undefined;
  onSymbolMouseOut: ((symbol: string) => any) | undefined;
  onSymbolClick: ((symbol: string) => any) | undefined;
}

/**
 *
 */
const GlyphStack = ({
  height,
  width,
  indices,
  alphabet,
  lv,
  transform,
  alpha,
  inverted = false,
  onSymbolMouseOver,
  onSymbolMouseOut,
  onSymbolClick,
}: GlyphStackProps) => {
  /* move up from bottom */
  let cy = height; // start from bottom with smallest letter
  let xscale = width / 100.0; // scale to glyphs' 100x100 viewport

  /* if no alpha passed, default to opaque */
  alpha = alpha || 1;

  /* stack glyphs in order */
  let glyphs = indices.map((index) => {
    if (!alphabet[index] || !alphabet[index].component) {
      return null;
    }
    if (lv[index] === 0.0) {
      return null;
    }

    cy -= lv[index] * 100.0;
    const ccy = inverted ? cy + lv[index] * 100.0 : cy;

    if (!alphabet[index].component.map) {
      let G = alphabet[index].component;
      const { component, ...props } = alphabet[index];
      return (
        <g
          transform={"translate(0," + ccy + ")"}
          key={index}
          onMouseOver={onSymbolMouseOver && (() => onSymbolMouseOver(alphabet[index]))}
          onMouseOut={onSymbolMouseOut && (() => onSymbolMouseOut(alphabet[index]))}
          onClick={onSymbolClick && (() => onSymbolClick(alphabet[index]))}
        >
          <Glyph xscale={xscale} yscale={lv[index]} inverted={inverted}>
            <G fill={alphabet[index].color} fillOpacity={alpha} {...props} />
          </Glyph>
        </g>
      );
    }

    let _xscale = (xscale * 0.8) / alphabet[index].component.length;
    if (!alphabet[index].color.map) alphabet[index].color = alphabet[index].component.map(() => alphabet[index].color);
    return alphabet[index].component.map((G: any, i: number) => {
      const { component, ...props } = alphabet[index];
      return (
        <g
          transform={
            "translate(" + ((i * width * 0.8) / alphabet[index].component.length + width * 0.1) + "," + ccy + ")"
          }
          key={index + "_" + i}
          onMouseOver={onSymbolMouseOver && (() => onSymbolMouseOver(alphabet[index]))}
          onMouseOut={onSymbolMouseOut && (() => onSymbolMouseOut(alphabet[index]))}
          onClick={onSymbolClick && (() => onSymbolClick(alphabet[index]))}
        >
          <Glyph xscale={_xscale} yscale={lv[index]} inverted={inverted}>
            <G fill={alphabet[index].color[i]} fillOpacity={alpha} {...props} />
          </Glyph>
        </g>
      );
    });
  });

  /* wrap glyphs in g */
  return <g transform={transform}>{glyphs}</g>;
};
export default GlyphStack;
