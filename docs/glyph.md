# Built-in and custom glyphs

## Glyph overview

Glyphs are the smallest building blocks of LogosJ logos. Each glyph is a self-contained SVG
object which renders itself within a 100 by 100 square. Logo components are responsible for
applying the appropriate transforms to the glyph objects they contain to adjust their positions
within the logo and their heights.  

## Built-in glyphs

LogosJ uses a custom font to render its glyphs, which include the capital letters A-Z, the lower
case letters a-z, and the digits 0-9. Most glyphs contain a single SVG `path` element, and apply
their props directly to it. You can apply properties including, but not limited to:

* **fill**: the color of the glyph.
* **fillOpacity**: number from 0 to 1 representing transparency, with 0 being transparent and 1
being opaque.

In general, it is not necessary to render glyphs directly; instead, they should be passed as
properties to logo components in alphabet arrays (see the alphabet page for details). When you need
to include built-in symbols in a custom alphabet, you can import built-in glyphs directly from the
LogosJ package. Capital letters are their own components; lower case letters are represented as LC_a,
LC_b, etc. and numbers as N1, N2, etc. For example the following code imports capital A,
lower case a, and the number 1:

```js
import { A, LC_a, N1 } from 'logojs';
```

In plain Javascript, these are available in the `logojs` namespace as `logojs.A`, `logojs.LC_a`,
`logojs.N1`, etc.

## Custom glyphs

If you want to add a custom symbol which is not built in to LogosJ, you can make a custom glyph
component. Glyph components should render an SVG element, such as a `path` or a collection of
`path`s contained with a `g`, with a width of 100 and a height of 100. When rendered in a logo,
your custom glyph will be scaled automatically.

It is best practice to pass the full collection of properties your glyph receives on to the SVG
element it renders. For example, here is the source code for LogosJ's built-in **C**, which passes
all its properties on to a single child `path`:

```js
const _path = `M 100 28 C 100 -13 0 -13 0 50
         C 0 113 100 113 100 72 L 75 72
         C 75 90 30 90 30 50 C 30 10 75 10 75 28
         L 100 28`;

export const C = props => (
    <path {...props} d={_path} />
);
```

To render a custom symbol, you could simply replace the `path` data above with your own.
At the very least, your custom glyph should support **fill** which determines its color and
**fillOpacity** which determines its transparency. For instructions on how to include your
custom glyph in a logo, see the custom alphabets section.
