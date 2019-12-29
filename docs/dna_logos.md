# Rendering DNA logos

## With React: DNALogo component

The `DNALogo` component renders a logo with the `DNAAlphabet` (A, C, G, and T) with accompanying x- and y-axes.
The color scheme used for the letters is similar to MEME; A is red, C is blue, G is gold, and T is green.
The logo can use either information content (0-2 bits) or base frequency (0%-100%) for letter heights at each
position. If you need custom axes, custom colors, or a custom alphabet, use the `Logo` or `RawLogo` compoenent instead.
If you need negative letter heights, use the `LogoWithNegatives` component instead. The following is a CTCF logo
rendered with the default `DNALogo` component:

<img src="http://logosj.wenglab.org/svg/eyJwcG0iOltbMC4wOSwwLjMxLDAuMDgsMC41XSxbMC4xOCwwLjE1LDAuNDUsMC4yXSxbMC4zLDAuMDUsMC40OSwwLjE0XSxbMC4wNiwwLjg3LDAuMDIsMC4wM10sWzAsMC45OCwwLDAuMDJdLFswLjgxLDAuMDEsMC4wNywwLjA5XSxbMC4wNCwwLjU3LDAuMzYsMC4wMV0sWzAuMTEsMC40NywwLjA1LDAuMzVdLFswLjkzLDAuMDEsMC4wMywwLjAxXSxbMCwwLDAuOTksMC4wMV0sWzAuMzYsMCwwLjY0LDBdLFswLjA1LDAuMDEsMC41NSwwLjM3XSxbMC4wMywwLDAuOTcsMF0sWzAuMDYsMCwwLjg1LDAuMDddLFswLjExLDAuOCwwLDAuMDddLFswLjQsMC4wMSwwLjU1LDAuMDFdLFswLjA5LDAuNTMsMC4zMywwLjA0XSxbMC4xMiwwLjM1LDAuMDgsMC40M10sWzAuNDQsMC4xOSwwLjI5LDAuMDZdXSwidHlwZWlkIjowLCJzY2FsZSI6MSwiaXNmcmVxIjpmYWxzZSwiZmlyc3RiYXNlIjoxLCJhbHBoYWJldCI6W3sicmVnZXgiOiJBIiwiY29sb3IiOiJyZWQifSx7InJlZ2V4IjoiQyIsImNvbG9yIjoiYmx1ZSJ9LHsicmVnZXgiOiJHIiwiY29sb3IiOiJvcmFuZ2UifSx7InJlZ2V4IjoiVCIsImNvbG9yIjoiIzIyOGIyMiJ9XX0" alt="CTCF logo" width="50%">

`DNALogo` takes the following properties:

* **ppm**: a matrix containing nucleotide frequencies at each position, ranging
from 0.0 to 1.0. Each row is a position in the logo, and the columns are alphabetical
(A, C, G, U).
* **pfm**: a matrix containing the number of times a nucleotide occurs at each
position; this is only used if **ppm** is not provided. The row and column orders
are the same as for **ppm**.
* **fasta**: sequences in FASTA format from which to compute the logo; only used if **ppm** and **pfm** are not provided.
* **noFastaNames**: if specified, the string in FASTA contains exactly one sequence per line and no sequence names are included.
* **countUnaligned**: if specified, unaligned positions in the FASTA sequence are inlcuded in the infomation content computation, which de-emphasizes them in the logo.
* **mode**: determines how letter heights are computed; may be either
`"INFORMATION_CONTENT"` (default) or `"FREQUENCY"`.
* **startpos**: if set, the first base in the logo will be numbered with a
value other than the default of 1.
* **backgroundFrequencies**: optional; an array of background frequencies to use to
compute information content in place of the default 1/4 for each nucleotide. The order of the
array is A, C, G, U. If **mode** is not INFORMATION_CONTENT, this is ignored.
* **yAxisMax**: optional; if provided, uses the given value as an explicit maximum for the y-axis
rather than the maximum number of bits possible. This is only used in `INFORMATION_CONTENT` mode;
in `FREQUENCY` mode, it is ignored.
* **onSymbolMouseOver**: callback when a symbol in the logo is moused over.
* **onSymbolClick**: callback when a symbol in the logo is clicked.
* **onSymbolMouseOut**: callback when a symbol in the logo is moused out.

The three mouse event callbacks receive two arguments: *position*, the 0-based index of the position in the logo; and *symbol*, the symbol's entry in the *alphabet* array.

```js
import { DNALogo } from 'logosj-react';

const CTCF_PPM = [
  [0.09, 0.31, 0.08, 0.50], [0.18, 0.15, 0.45, 0.20], [0.30, 0.05, 0.49, 0.14],
  [0.06, 0.87, 0.02, 0.03], [0.00, 0.98, 0.00, 0.02], [0.81, 0.01, 0.07, 0.09], 
  [0.04, 0.57, 0.36, 0.01], [0.11, 0.47, 0.05, 0.35], [0.93, 0.01, 0.03, 0.01],
  [0.00, 0.00, 0.99, 0.01], [0.36, 0.00, 0.64, 0.00], [0.05, 0.01, 0.55, 0.37], 
  [0.03, 0.00, 0.97, 0.00], [0.06, 0.00, 0.85, 0.07], [0.11, 0.80, 0.00, 0.07],
  [0.40, 0.01, 0.55, 0.01], [0.09, 0.53, 0.33, 0.04], [0.12, 0.35, 0.08, 0.43], 
  [0.44, 0.19, 0.29, 0.06]
];

export const CTCFLogo = props => (
    <DNALogo ppm={CTCF_PPM} />
);
```

## Without React: embedDNALogo function

Outside of React, use the `logosj.embedDNALogo` function to embed a `DNALogo` component in a `div`.
`logosj.embedDNALogo` takes two arguments:

* **div**: HTML element in which to embed the DNA logo; its `innerHTML` will be
replaced by the rendered logo.
* **properties**: an object containing the above properties.

If you don't use React, the following code embeds the DNA logo in a `div` element:

```html
<!doctype html>
<html>
  <body>
    <script src="http://bundle.logosj.wenglab.org/bundle.js" type="text/javascript"></script>
    <div id="logo" style="width:500px"></div>
    <script type="text/javascript">
      const CTCF_PPM = [
        [0.09, 0.31, 0.08, 0.50], [0.18, 0.15, 0.45, 0.20], [0.30, 0.05, 0.49, 0.14],
        [0.06, 0.87, 0.02, 0.03], [0.00, 0.98, 0.00, 0.02], [0.81, 0.01, 0.07, 0.09], 
        [0.04, 0.57, 0.36, 0.01], [0.11, 0.47, 0.05, 0.35], [0.93, 0.01, 0.03, 0.01],
        [0.00, 0.00, 0.99, 0.01], [0.36, 0.00, 0.64, 0.00], [0.05, 0.01, 0.55, 0.37], 
        [0.03, 0.00, 0.97, 0.00], [0.06, 0.00, 0.85, 0.07], [0.11, 0.80, 0.00, 0.07],
        [0.40, 0.01, 0.55, 0.01], [0.09, 0.53, 0.33, 0.04], [0.12, 0.35, 0.08, 0.43], 
        [0.44, 0.19, 0.29, 0.06]
      ];
      logosj.embedDNALogo(document.getElementById("logo"), { ppm: CTCF_PPM });
    </script>
  </body>
</html>
```
