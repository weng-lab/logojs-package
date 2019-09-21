# Rendering RNA logos

## With React: RNALogo component

The `RNALogo` component renders a logo with the `RNAAlphabet` (A, C, G, and U) with accompanying x- and y-axes.
The color scheme used for the letters is similar to MEME; A is red, C is blue, G is gold, and U is green.
The logo can use either information content (0-2 bits) or base frequency (0%-100%) for letter heights at each
position. If you need custom axes, custom colors, or a custom alphabet, use the `Logo` or `RawLogo` compoenent instead.
If you need negative letter heights, use the `LogoWithNegatives` component instead. The following is a logo for the
**QKI** RNA binding protein, which binds a consensus sequence of **ACUAAC**:

<img alt="QKI logo" src="http://logosj.wenglab.org/svg/eyJwcG0iOltbMC43LDAuMSwwLjEsMC4xXSxbMCwxLDAsMF0sWzAsMCwwLDFdLFsxLDAsMCwwXSxbMSwwLDAsMF0sWzAsMSwwLDBdLFswLjMsMC4yLDAuMywwLjJdXSwidHlwZWlkIjoxLCJzY2FsZSI6MSwiaXNmcmVxIjpmYWxzZSwiZmlyc3RiYXNlIjoxLCJhbHBoYWJldCI6W3sicmVnZXgiOiJBIiwiY29sb3IiOiJyZWQifSx7InJlZ2V4IjoiQyIsImNvbG9yIjoiYmx1ZSJ9LHsicmVnZXgiOiJHIiwiY29sb3IiOiJvcmFuZ2UifSx7InJlZ2V4IjoiVSIsImNvbG9yIjoiIzIyOGIyMiJ9XX0=" width="50%" />

`RNALogo` takes the following properties:

* **ppm**: a matrix containing nucleotide frequencies at each position, ranging
from 0.0 to 1.0. Each row is a position in the logo, and the columns are alphabetical
(A, C, G, U).
* **pfm**: a matrix containing the number of times a nucleotide occurs at each
position; this is only used if **ppm** is not provided. The row and column orders
are the same as for **ppm**.
* **mode**: determines how letter heights are computed; may be either
`"INFORMATION_CONTENT"` (default) or `"FREQUENCY"`.
* **startpos**: if set, the first base in the logo will be numbered with a
value other than the default of 1.
* **backgroundFrequencies**: optional; an array of background frequencies to use to
compute information content in place of the default 1/4 for each nucleotide. The order of the
array is A, C, G, U. If **mode** is not INFORMATION_CONTENT, this is ignored.

```js
import { RNALogo } from 'logosj-react';

const QKI_PPM = [
  [0.09, 0.31, 0.08, 0.50], [0.18, 0.15, 0.45, 0.20], [0.30, 0.05, 0.49, 0.14],
  [0.06, 0.87, 0.02, 0.03], [0.00, 0.98, 0.00, 0.02], [0.81, 0.01, 0.07, 0.09], 
  [0.04, 0.57, 0.36, 0.01], [0.11, 0.47, 0.05, 0.35], [0.93, 0.01, 0.03, 0.01],
  [0.00, 0.00, 0.99, 0.01], [0.36, 0.00, 0.64, 0.00], [0.05, 0.01, 0.55, 0.37], 
  [0.03, 0.00, 0.97, 0.00], [0.06, 0.00, 0.85, 0.07], [0.11, 0.80, 0.00, 0.07],
  [0.40, 0.01, 0.55, 0.01], [0.09, 0.53, 0.33, 0.04], [0.12, 0.35, 0.08, 0.43], 
  [0.44, 0.19, 0.29, 0.06]
];

export const QKILogo = props => (
    <RNALogo ppm={QKI_PPM} />
);
```

## Without React: embedRNALogo function

Outside of React, use the `logosj.embedRNALogo` function to embed a `RNALogo` component in a `div`.
`logosj.embedRNALogo` takes two arguments:

* **div**: HTML element in which to embed the RNA logo; its `innerHTML` will be
replaced by the rendered logo.
* **properties**: an object containing the above properties.

If you don't use React, the following code embeds the RNA logo in a `div` element:

```html
<!doctype html>
<html>
  <body>
    <script src="https://bundle.logosj.wenglab.org/bundle.js" type="text/javascript"></script>
    <div id="logo" style="width:500px"></div>
    <script type="text/javascript">
      const QKI_PPM = [
        [0.09, 0.31, 0.08, 0.50], [0.18, 0.15, 0.45, 0.20], [0.30, 0.05, 0.49, 0.14],
        [0.06, 0.87, 0.02, 0.03], [0.00, 0.98, 0.00, 0.02], [0.81, 0.01, 0.07, 0.09], 
        [0.04, 0.57, 0.36, 0.01], [0.11, 0.47, 0.05, 0.35], [0.93, 0.01, 0.03, 0.01],
        [0.00, 0.00, 0.99, 0.01], [0.36, 0.00, 0.64, 0.00], [0.05, 0.01, 0.55, 0.37], 
        [0.03, 0.00, 0.97, 0.00], [0.06, 0.00, 0.85, 0.07], [0.11, 0.80, 0.00, 0.07],
        [0.40, 0.01, 0.55, 0.01], [0.09, 0.53, 0.33, 0.04], [0.12, 0.35, 0.08, 0.43], 
        [0.44, 0.19, 0.29, 0.06]
      ];
      logosj.embedRNALogo(document.getElementById("logo"), { ppm: QKI_PPM });
    </script>
  </body>
</html>
```
