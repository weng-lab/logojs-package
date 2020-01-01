# Rendering Protein logos

## With React: ProteinLogo component

The `ProteinLogo` component renders a logo with the `ProteinAlphabet` (22 amino acids plus **B** and **Z**)
with accompanying x- and y-axes. The color scheme corresponds to the chemical properties of the amino acids:
acidic is red, basic is blue, non-polar is black, and ambiguous (**B** - **N** or **D** and **Z** - **Q** or **E**)
are gold. The logo can use either information content (0-4.5 bits) or amino acid frequency (0%-100%) for letter heights
at each position. If you need custom axes, custom colors, or a custom alphabet, use the `Logo` or `RawLogo` compoenent instead.
If you need negative letter heights, use the `LogoWithNegatives` component instead. The following is a logo for the
**helix turn helix** motif of the **catabolite activator protein** (CAP) family:

<img src="http://logojs.wenglab.org/svg/eyJwcG0iOltbMC4wMSwwLDAuMDIsMCwwLDAuMDQsMCwwLDAuMjEsMCwwLjU1LDAsMCwwLDAsMCwwLDAsMC4wNywwLDAsMF0sWzAuMDMsMCwwLDAuMDMsMCwwLDAsMCwwLDAuMTksMCwwLDAuMDUsMC4zNSwwLjAxLDAuMTEsMC4wMiwwLjE2LDAuMDMsMCwwLjAxLDBdLFswLjAxLDAsMC4wMSwwLDAsMCwwLDAsMC4yLDAsMC4zNSwwLjM5LDAsMCwwLDAsMCwwLDAuMDUsMCwwLDBdLFswLjAyLDAsMC4wMSwwLDAuMDEsMCwwLjAxLDAsMCwwLjA0LDAsMCwwLjAxLDAuMDIsMCwwLDAuMzcsMC41MSwwLDAsMCwwXSxbMCwwLDAsMCwwLDAsMCwwLDAsMCwwLjAyLDAuMDEsMCwwLDAsMCwwLDAsMCwwLDAsMF0sWzAsMCwwLDAsMCwwLDAsMCwwLDAsMCwwLDAuMDIsMCwwLDAsMC4wMSwwLDAsMCwwLDBdLFswLjAxLDAsMCwwLDAsMCwwLDAuMTYsMC4wMSwwLjAyLDAuMDIsMC4wMSwwLjAzLDAsMC4wOCwwLjYzLDAuMDEsMC4wMSwwLDAuMDEsMCwwXSxbMC4xMywwLDAsMC4wMSwwLjExLDAsMC4xOCwwLjAxLDAsMC4wNCwwLjAxLDAuMDEsMC4wNCwwLDAuNCwwLjA0LDAsMC4wMywwLDAsMCwwXSxbMC4wOSwwLDAsMC40NCwwLjQsMCwwLDAsMCwwLDAsMC4wMiwwLjAxLDAsMC4wMywwLDAsMCwwLjAxLDAsMC4wMSwwXSxbMCwwLDAsMCwwLDAsMCwwLDAuNzQsMCwwLjE4LDAuMDYsMCwwLDAsMCwwLDAuMDEsMC4wMSwwLDAsMF0sWzAuNTgsMCwwLDAsMCwwLDAuMzgsMCwwLDAsMCwwLDAsMCwwLDAsMC4wNCwwLDAsMCwwLDBdLFswLjAzLDAsMCwwLjI3LDAuMTQsMCwwLDAuMDEsMCwwLjA0LDAsMC4wMSwwLjI0LDAsMC4xNSwwLjA0LDAuMDcsMC4wMSwwLDAsMCwwXSxbMC4xMiwwLDAsMCwwLDAuMTUsMCwwLjA0LDAuMTEsMCwwLjA4LDAuMTEsMCwwLDAsMC4wMywwLjAxLDAsMC4wMSwwLDAuMzUsMF0sWzAsMCwwLjAzLDAsMCwwLDAsMCwwLjEzLDAsMC41MiwwLDAsMCwwLDAsMC4wNSwwLjA0LDAuMjMsMCwwLDBdLFswLjAzLDAsMCwwLDAsMCwwLjk1LDAsMCwwLDAsMCwwLDAsMCwwLDAuMDIsMCwwLDAsMCwwXSxbMC4wNywwLDAuMTQsMCwwLDAsMCwwLDAsMCwwLjUsMC4wMiwwLDAsMC4wMSwwLDAuMTIsMC4xMywwLjAyLDAsMCwwXSxbMC4wOSwwLDAuMDEsMCwwLDAsMCwwLDAsMC4wMiwwLDAsMCwwLDAsMC4wMSwwLjIxLDAuNjYsMCwwLDAsMF0sWzAuMDEsMCwwLDAsMCwwLDAsMCwwLjE5LDAsMC4xMSwwLDAuMDEsMC4wNiwwLDAuNDEsMCwwLjAxLDAuMjEsMCwwLDBdLFswLDAsMCwwLDAuNzcsMCwwLDAuMDMsMC4wMSwwLDAsMCwwLDAsMC4wNCwwLDAuMDIsMCwwLjEzLDAsMCwwXSxbMCwwLDAsMCwwLDAsMCwwLjAyLDAsMCwwLDAuMDMsMCwwLDAsMCwwLjAzLDAuOTEsMCwwLjAxLDAsMF0sWzAuMDQsMCwwLDAsMCwwLjAxLDAsMCwwLjI0LDAsMC4wMSwwLjAxLDAsMCwwLDAsMCwwLjAyLDAuNjcsMCwwLDBdLFswLjAyLDAsMC4wMSwwLDAsMCwwLjE0LDAsMC4wMSwwLDAsMCwwLjA4LDAsMCwwLDAuNTgsMC4xNiwwLDAsMCwwXSxbMC4wMSwwLDAsMCwwLDAsMCwwLjA0LDAsMC4wNCwwLDAuMDEsMCwwLDAsMC44OSwwLDAuMDEsMCwwLDAsMF0sWzAuMDUsMCwwLjAxLDAsMCwwLDAsMCwwLjE1LDAuMDUsMC4yNywwLjA1LDAsMCwwLjEsMCwwLjAyLDAuMTIsMC4xNSwwLDAsMF0sWzAsMCwwLDAsMCwwLjA5LDAsMCwwLjA4LDAsMC42NSwwLjA4LDAsMCwwLDAsMCwwLDAuMDYsMCwwLDBdLFswLjA0LDAsMCwwLDAsMCwwLjI4LDAsMCwwLjIyLDAsMCwwLjAzLDAsMCwwLjA0LDAuMTQsMC4yMiwwLDAsMCwwXSxbMC4wOCwwLDAsMC4xNCwwLjA2LDAsMC4wMSwwLDAuMDEsMC4xOCwwLjAzLDAuMTEsMCwwLDAuMDMsMC4yOSwwLjAxLDAsMC4wMSwwLDAuMDEsMF0sWzAsMCwwLDAsMCwwLjI3LDAsMCwwLDAsMC42NSwwLDAsMCwwLDAsMCwwLDAsMC4wNCwwLDBdLFswLjA4LDAsMCwwLDAuMjUsMCwwLjAxLDAuMDQsMCwwLjA4LDAsMCwwLDAsMC4yMiwwLjI3LDAuMDEsMC4wMSwwLDAsMCwwXSxbMC4wNywwLDAuMDEsMC4xMywwLjE2LDAsMC4wMSwwLjAyLDAsMC4yOCwwLDAsMC4wMSwwLDAuMTMsMC4wOCwwLjAyLDAuMDUsMCwwLDAsMF0sWzAuMDEsMCwwLDAuMTIsMC4xNywwLDAuMDIsMC4wMSwwLjAxLDAuMDcsMC4wNCwwLjAxLDAuMDYsMCwwLjE4LDAuMSwwLjE0LDAsMC4wMSwwLjAxLDAuMDEsMF0sWzAsMCwwLDAuMDEsMC4wNiwwLDAuNjIsMC4wMywwLDAuMDYsMCwwLDAuMTUsMCwwLjAyLDAsMC4wMSwwLDAsMCwwLDBdLFswLjAyLDAsMCwwLDAsMC4wMywwLDAsMC4wOSwwLjAxLDAuNDEsMC4xMiwwLDAsMCwwLjAxLDAsMC4wMSwwLjIxLDAuMDUsMC4wMSwwXSxbMCwwLDAsMCwwLDAsMCwwLDAuNjUsMCwwLjE3LDAsMCwwLDAsMCwwLDAsMC4xNCwwLDAsMF1dLCJ0eXBlaWQiOjIsInNjYWxlIjoxLCJpc2ZyZXEiOmZhbHNlLCJmaXJzdGJhc2UiOjEsImFscGhhYmV0IjpbeyJyZWdleCI6IkEiLCJjb2xvciI6ImJsYWNrIn0seyJyZWdleCI6IkIiLCJjb2xvciI6IiNiYjg4MDAifSx7InJlZ2V4IjoiQyIsImNvbG9yIjoiIzAwODgxMSJ9LHsicmVnZXgiOiJEIiwiY29sb3IiOiIjZmYwMDAwIn0seyJyZWdleCI6IkUiLCJjb2xvciI6IiNmZjAwMjIifSx7InJlZ2V4IjoiRiIsImNvbG9yIjoiIzMzMzMzMyJ9LHsicmVnZXgiOiJHIiwiY29sb3IiOiIjMDA3NzAwIn0seyJyZWdleCI6IkgiLCJjb2xvciI6IiMyMjAwOTkifSx7InJlZ2V4IjoiSSIsImNvbG9yIjoiIzExMTExMSJ9LHsicmVnZXgiOiJLIiwiY29sb3IiOiIjMDAwMGFhIn0seyJyZWdleCI6IkwiLCJjb2xvciI6IiMwMDIyMjIifSx7InJlZ2V4IjoiTSIsImNvbG9yIjoiIzIyMDAyMiJ9LHsicmVnZXgiOiJOIiwiY29sb3IiOiIjMDA5OTExIn0seyJyZWdleCI6IlAiLCJjb2xvciI6IiMwODA4MDgifSx7InJlZ2V4IjoiUSIsImNvbG9yIjoiIzAwYWEwMCJ9LHsicmVnZXgiOiJSIiwiY29sb3IiOiIjMDAyMmFhIn0seyJyZWdleCI6IlMiLCJjb2xvciI6IiMwMDhmMDAifSx7InJlZ2V4IjoiVCIsImNvbG9yIjoiIzAwNjYwMCJ9LHsicmVnZXgiOiJWIiwiY29sb3IiOiIjMjIyMjAwIn0seyJyZWdleCI6IlciLCJjb2xvciI6IiMwODA4MDgifSx7InJlZ2V4IjoiWSIsImNvbG9yIjoiIzAwYTgwMCJ9LHsicmVnZXgiOiJaIiwiY29sb3IiOiIjYWFhYTAwIn1dfQ==" alt="protein logo" width="100%">

`ProteinLogo` takes the following properties:

* **ppm**: a matrix containing amino acid frequencies at each position, ranging from 0.0 to 1.0.
Each row is a position in the logo, and the columns are alphabetical.
* **pfm**: a matrix containing the number of times each amino acid occurs at each position.
This is only used if **ppm** is not provided. Column and row orders are the same as for **ppm**.
* **fasta**: sequences in FASTA format from which to compute the logo; only used if **ppm** and **pfm** are not provided.
* **noFastaNames**: if specified, the string in FASTA contains exactly one sequence per line and no sequence names are included.
* **countUnaligned**: if specified, unaligned positions in the FASTA sequence are inlcuded in the infomation content computation, which de-emphasizes them in the logo.
* **mode**: determines how letter heights are computed; may be either
`"INFORMATION_CONTENT"` (default) or `"FREQUENCY"`.
* **startpos**: if set, the first base in the logo will be numbered with a
value other than the default of 1.
* **backgroundFrequencies**: optional; an array of background frequencies to use to
compute information content in place of the default 1/20 for each amino acid. The order of the
array is alphabetical. If **mode** is not INFORMATION_CONTENT, this is ignored.
* **yAxisMax**: optional; if provided, uses the given value as an explicit maximum for the y-axis
rather than the maximum number of bits possible. This is only used in `INFORMATION_CONTENT` mode;
in `FREQUENCY` mode, it is ignored.
* **onSymbolMouseOver**: callback when a symbol in the logo is moused over.
* **onSymbolClick**: callback when a symbol in the logo is clicked.
* **onSymbolMouseOut**: callback when a symbol in the logo is moused out.

The three mouse event callbacks receive two arguments: *position*, the 0-based index of the position in the logo; and *symbol*, the symbol's entry in the *alphabet* array.

```js
import { ProteinLogo } from 'logojs-react';

const CAP_PPM = [
  [0.01,0,0.02,0,0,0.04,0,0,0.21,0,0.55,0,0,0,0,0,0,0,0.07,0,0,0],
  [0.03,0,0,0.03,0,0,0,0,0,0.19,0,0,0.05,0.35,0.01,0.11,0.02,0.16,0.03,0,0.01,0],
  [0.01,0,0.01,0,0,0,0,0,0.2,0,0.35,0.39,0,0,0,0,0,0,0.05,0,0,0],
  [0.02,0,0.01,0,0.01,0,0.01,0,0,0.04,0,0,0.01,0.02,0,0,0.37,0.51,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0.02,0.01,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0.02,0,0,0,0.01,0,0,0,0,0],
  [0.01,0,0,0,0,0,0,0.16,0.01,0.02,0.02,0.01,0.03,0,0.08,0.63,0.01,0.01,0,0.01,0,0],
  [0.13,0,0,0.01,0.11,0,0.18,0.01,0,0.04,0.01,0.01,0.04,0,0.4,0.04,0,0.03,0,0,0,0],
  [0.09,0,0,0.44,0.4,0,0,0,0,0,0,0.02,0.01,0,0.03,0,0,0,0.01,0,0.01,0],
  [0,0,0,0,0,0,0,0,0.74,0,0.18,0.06,0,0,0,0,0,0.01,0.01,0,0,0],
  [0.58,0,0,0,0,0,0.38,0,0,0,0,0,0,0,0,0,0.04,0,0,0,0,0],
  [0.03,0,0,0.27,0.14,0,0,0.01,0,0.04,0,0.01,0.24,0,0.15,0.04,0.07,0.01,0,0,0,0],
  [0.12,0,0,0,0,0.15,0,0.04,0.11,0,0.08,0.11,0,0,0,0.03,0.01,0,0.01,0,0.35,0],
  [0,0,0.03,0,0,0,0,0,0.13,0,0.52,0,0,0,0,0,0.05,0.04,0.23,0,0,0],
  [0.03,0,0,0,0,0,0.95,0,0,0,0,0,0,0,0,0,0.02,0,0,0,0,0],
  [0.07,0,0.14,0,0,0,0,0,0,0,0.5,0.02,0,0,0.01,0,0.12,0.13,0.02,0,0,0],
  [0.09,0,0.01,0,0,0,0,0,0,0.02,0,0,0,0,0,0.01,0.21,0.66,0,0,0,0],
  [0.01,0,0,0,0,0,0,0,0.19,0,0.11,0,0.01,0.06,0,0.41,0,0.01,0.21,0,0,0],
  [0,0,0,0,0.77,0,0,0.03,0.01,0,0,0,0,0,0.04,0,0.02,0,0.13,0,0,0],
  [0,0,0,0,0,0,0,0.02,0,0,0,0.03,0,0,0,0,0.03,0.91,0,0.01,0,0],
  [0.04,0,0,0,0,0.01,0,0,0.24,0,0.01,0.01,0,0,0,0,0,0.02,0.67,0,0,0],
  [0.02,0,0.01,0,0,0,0.14,0,0.01,0,0,0,0.08,0,0,0,0.58,0.16,0,0,0,0],
  [0.01,0,0,0,0,0,0,0.04,0,0.04,0,0.01,0,0,0,0.89,0,0.01,0,0,0,0],
  [0.05,0,0.01,0,0,0,0,0,0.15,0.05,0.27,0.05,0,0,0.1,0,0.02,0.12,0.15,0,0,0],
  [0,0,0,0,0,0.09,0,0,0.08,0,0.65,0.08,0,0,0,0,0,0,0.06,0,0,0],
  [0.04,0,0,0,0,0,0.28,0,0,0.22,0,0,0.03,0,0,0.04,0.14,0.22,0,0,0,0],
  [0.08,0,0,0.14,0.06,0,0.01,0,0.01,0.18,0.03,0.11,0,0,0.03,0.29,0.01,0,0.01,0,0.01,0],
  [0,0,0,0,0,0.27,0,0,0,0,0.65,0,0,0,0,0,0,0,0,0.04,0,0],
  [0.08,0,0,0,0.25,0,0.01,0.04,0,0.08,0,0,0,0,0.22,0.27,0.01,0.01,0,0,0,0],
  [0.07,0,0.01,0.13,0.16,0,0.01,0.02,0,0.28,0,0,0.01,0,0.13,0.08,0.02,0.05,0,0,0,0],
  [0.01,0,0,0.12,0.17,0,0.02,0.01,0.01,0.07,0.04,0.01,0.06,0,0.18,0.1,0.14,0,0.01,0.01,0.01,0],
  [0,0,0,0.01,0.06,0,0.62,0.03,0,0.06,0,0,0.15,0,0.02,0,0.01,0,0,0,0,0],
  [0.02,0,0,0,0,0.03,0,0,0.09,0.01,0.41,0.12,0,0,0,0.01,0,0.01,0.21,0.05,0.01,0],
  [0,0,0,0,0,0,0,0,0.65,0,0.17,0,0,0,0,0,0,0,0.14,0,0,0]
];

export const CAPLogo = props => (
    <ProteinLogo ppm={CAP_PPM} />
);
```

## Without React: embedProteinLogo function

Outside of React, use the `logojs.embedProteinLogo` function to embed a `ProteinLogo` component in a `div`.
`logojs.embedProteinLogo` takes two arguments:

* **div**: HTML element in which to embed the Protein logo; its `innerHTML` will be
replaced by the rendered logo.
* **properties**: an object containing the above properties.

If you don't use React, the following code embeds the Protein logo in a `div` element:

```html
<!doctype html>
<html>
  <body>
    <script src="http://bundle.logojs.wenglab.org/bundle.js" type="text/javascript"></script>
    <div id="logo" style="width:500px"></div>
    <script type="text/javascript">
      const CAP_PPM = [
        [0.01,0,0.02,0,0,0.04,0,0,0.21,0,0.55,0,0,0,0,0,0,0,0.07,0,0,0],
        [0.03,0,0,0.03,0,0,0,0,0,0.19,0,0,0.05,0.35,0.01,0.11,0.02,0.16,0.03,0,0.01,0],
        [0.01,0,0.01,0,0,0,0,0,0.2,0,0.35,0.39,0,0,0,0,0,0,0.05,0,0,0],
        [0.02,0,0.01,0,0.01,0,0.01,0,0,0.04,0,0,0.01,0.02,0,0,0.37,0.51,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0.02,0.01,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0.02,0,0,0,0.01,0,0,0,0,0],
        [0.01,0,0,0,0,0,0,0.16,0.01,0.02,0.02,0.01,0.03,0,0.08,0.63,0.01,0.01,0,0.01,0,0],
        [0.13,0,0,0.01,0.11,0,0.18,0.01,0,0.04,0.01,0.01,0.04,0,0.4,0.04,0,0.03,0,0,0,0],
        [0.09,0,0,0.44,0.4,0,0,0,0,0,0,0.02,0.01,0,0.03,0,0,0,0.01,0,0.01,0],
        [0,0,0,0,0,0,0,0,0.74,0,0.18,0.06,0,0,0,0,0,0.01,0.01,0,0,0],
        [0.58,0,0,0,0,0,0.38,0,0,0,0,0,0,0,0,0,0.04,0,0,0,0,0],
        [0.03,0,0,0.27,0.14,0,0,0.01,0,0.04,0,0.01,0.24,0,0.15,0.04,0.07,0.01,0,0,0,0],
        [0.12,0,0,0,0,0.15,0,0.04,0.11,0,0.08,0.11,0,0,0,0.03,0.01,0,0.01,0,0.35,0],
        [0,0,0.03,0,0,0,0,0,0.13,0,0.52,0,0,0,0,0,0.05,0.04,0.23,0,0,0],
        [0.03,0,0,0,0,0,0.95,0,0,0,0,0,0,0,0,0,0.02,0,0,0,0,0],
        [0.07,0,0.14,0,0,0,0,0,0,0,0.5,0.02,0,0,0.01,0,0.12,0.13,0.02,0,0,0],
        [0.09,0,0.01,0,0,0,0,0,0,0.02,0,0,0,0,0,0.01,0.21,0.66,0,0,0,0],
        [0.01,0,0,0,0,0,0,0,0.19,0,0.11,0,0.01,0.06,0,0.41,0,0.01,0.21,0,0,0],
        [0,0,0,0,0.77,0,0,0.03,0.01,0,0,0,0,0,0.04,0,0.02,0,0.13,0,0,0],
        [0,0,0,0,0,0,0,0.02,0,0,0,0.03,0,0,0,0,0.03,0.91,0,0.01,0,0],
        [0.04,0,0,0,0,0.01,0,0,0.24,0,0.01,0.01,0,0,0,0,0,0.02,0.67,0,0,0],
        [0.02,0,0.01,0,0,0,0.14,0,0.01,0,0,0,0.08,0,0,0,0.58,0.16,0,0,0,0],
        [0.01,0,0,0,0,0,0,0.04,0,0.04,0,0.01,0,0,0,0.89,0,0.01,0,0,0,0],
        [0.05,0,0.01,0,0,0,0,0,0.15,0.05,0.27,0.05,0,0,0.1,0,0.02,0.12,0.15,0,0,0],
        [0,0,0,0,0,0.09,0,0,0.08,0,0.65,0.08,0,0,0,0,0,0,0.06,0,0,0],
        [0.04,0,0,0,0,0,0.28,0,0,0.22,0,0,0.03,0,0,0.04,0.14,0.22,0,0,0,0],
        [0.08,0,0,0.14,0.06,0,0.01,0,0.01,0.18,0.03,0.11,0,0,0.03,0.29,0.01,0,0.01,0,0.01,0],
        [0,0,0,0,0,0.27,0,0,0,0,0.65,0,0,0,0,0,0,0,0,0.04,0,0],
        [0.08,0,0,0,0.25,0,0.01,0.04,0,0.08,0,0,0,0,0.22,0.27,0.01,0.01,0,0,0,0],
        [0.07,0,0.01,0.13,0.16,0,0.01,0.02,0,0.28,0,0,0.01,0,0.13,0.08,0.02,0.05,0,0,0,0],
        [0.01,0,0,0.12,0.17,0,0.02,0.01,0.01,0.07,0.04,0.01,0.06,0,0.18,0.1,0.14,0,0.01,0.01,0.01,0],
        [0,0,0,0.01,0.06,0,0.62,0.03,0,0.06,0,0,0.15,0,0.02,0,0.01,0,0,0,0,0],
        [0.02,0,0,0,0,0.03,0,0,0.09,0.01,0.41,0.12,0,0,0,0.01,0,0.01,0.21,0.05,0.01,0],
        [0,0,0,0,0,0,0,0,0.65,0,0.17,0,0,0,0,0,0,0,0.14,0,0,0]
      ];
      logojs.embedProteinLogo(document.getElementById("logo"), { ppm: CAP_PPM });
    </script>
  </body>
</html>
```
