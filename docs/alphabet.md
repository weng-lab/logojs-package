# Built-in and custom alphabets

## Alphabet overview

LogosJ combines sets of individual glyphs into alphabets. An alphabet is an array of **symbols**,
each of which should have a unique color and glyph combination. Symbols are not restricted to
just one glyph; if you are rendering a dinucleotide logo, for example, you might use symbols with
two glyphs each. Alphabets can also have multiple symbols that use the same glyph with different
colors (for example one red **A** and one gray **A**).

When you are building your PWM, the order of the columns corresponds to the order of the symbols
in your alphabet array.

The symbol objects in an alphabet have the following fields:

* **color** an array of colors to use for each letter in the symbol. If the symbol is only one
letter, a single value may be used in place of an array.
* **component** an array of components used to render the glyphs in this symbol. Should be the
same length as **color**. If your alphabet uses custom glyphs, import your custom glyph
components and use them here. If the symbol is only one letter, a single component may be used
in place of an array. LogosJ can populate this field for you using the `loadGlyphComponents`
function.
* **regex** a string representing the sequence of letters in this symbol. This field is not
required, but may be used as a shorthand rather than explicitly including components in the
**component** field. LogosJ will then populate the **components** field for you if you call
the `loadGlyphComponents` function.

## Built-in alphabets

LogosJ provides built-in alphabets for common use cases for convenience. If you need to render
a custom logo with these symbol sets, you can import these alphabets rather than build them
yourself. In React, these can be imported directly from the `logosj` package; without React, they
are accessible under the `logosj` namespace (i.e. `logosj.DNAAlphabet`).

The `DNAAlphabet` renders logos with a DNA symbol set. **A** is red, **C** is blue, **G** is gold,
and **T** is green; columns in the PWM are in that order.

The `RNAAlphabet` renders logos with an RNA symbol set. **A** is red, **C** is blue,
**G** is gold, and **U** is green; columns in the PWM are in that order.

The `ProteinAlphabet` renders logos with a protein symbol set. Acidic amino acids are red, basic
amino acids are blue, and non-polar amino acids are black. **B** is used for **D** or **N** and
**Z** is used for **E** or **Q**; both are gold.

The `CompleteAlphabet` includes the capital letters A-Z, then the lower case letters a-z, then
the digits 0-9, all in that order and with custom colors. This can be used for experimentation
with different symbols.

## Custom alphabets

To make a custom alphabet, simply create a custom array of symbol objects as described above.
If you have custom React components for custom glyphs not built-in to LogosJ, you can include
them in the **components** field. The following is an example of a custom alphabet with **M**
and **W** representing methylated **CpG** on the plus and minus strands (the syntax below
first includes the core of the `DNAAlphabet`, then extends it with **M** and **W**):

```js
import { DNAAlphabet, loadGlyphComponents } from 'logosj';

export const METHYL_ALPHABET = loadGlyphComponents([
   ...DNAAlphabet,
   { color: "#880088", regex: "M" },
   { color: "#888800", regex: "W" }
]);
```

## Alphabet utilities

LogosJ provides two utility functions to make generating custom alphabets easier in particular
use cases.

The `loadGlyphComponents` function reads the optional **regex** field of each symbol in a
custom alphabet and automatically populates the corresponding **component** field with built-in
glyphs from LogosJ. If a symbol has a **component** field already but has no **regex** field,
it will be left unchanged; however, if it has a **regex** field and a **components** field the
contents of the **components** field will be overwritten. The regex field must only contain the
letters A-Z and a-z and the digits 0-9. The function takes the following argument:

* **alphabet** the custom alphabet, containing **regex** fields for each symbol; this parameter
remains unchanged, and a copy with **component** fields is returned.

The `disymbolAlphabet` function takes a custom alphabet and generates a new custom alphabet
with every possible pairing of symbols from the original. Colors for individual letters are
retained. For example, given the `DNAAlphabet` as input, this function would generate a new
alphabet with the symbols **AA**, **AC**, **AG**, **AT**, **CA**, ... **TT**. The function takes
a single argument:

* **alphabet** the input alphabet; remains unchanged. A new disymbol alphabet is returned.
