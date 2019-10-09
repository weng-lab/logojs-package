# LogosJ: Embeddable SVG Sequence Logos

LogosJ is a Javascipt package for creating SVG sequence logos.
LogosJ supports a wide range of biological use cases. This README provides a quick overview
of LogosJ installation and usage. For detailed examples with code samples
are available at our [companion site](http://logosj.wenglab.org/app/gallery) and documentation
at [GitHub Pages](https://weng-lab.github.io/logosj-package/).

LogosJ can be used with and without ReactJS. A companion web app makes it easy to share
SVG logos and generate them in batches from the output of common tools such as the MEME Suite.

## Using in your web application
You can add LogosJ to your project using NPM or Yarn:
```sh
yarn add logosj-react
```
or
```sh
npm install logosj-react
```

If you want to use LogosJ in a static web page, you can simply include the package with a
static script tag, which will add LogosJ to the global namespace as `logosj`:

```html
<script src="https://bundle.logosj.wenglab.org/bundle.js" type="text/javascript">
</script>
```

## Quick example: a DNA logo

The transcription factor CTCF binds a well-known consensus DNA sequence, rendered below with LogosJ:

<img src="https://logosj.wenglab.org/svg/eyJwcG0iOltbMC4wOSwwLjMxLDAuMDgsMC41XSxbMC4xOCwwLjE1LDAuNDUsMC4yXSxbMC4zLDAuMDUsMC40OSwwLjE0XSxbMC4wNiwwLjg3LDAuMDIsMC4wM10sWzAsMC45OCwwLDAuMDJdLFswLjgxLDAuMDEsMC4wNywwLjA5XSxbMC4wNCwwLjU3LDAuMzYsMC4wMV0sWzAuMTEsMC40NywwLjA1LDAuMzVdLFswLjkzLDAuMDEsMC4wMywwLjAxXSxbMCwwLDAuOTksMC4wMV0sWzAuMzYsMCwwLjY0LDBdLFswLjA1LDAuMDEsMC41NSwwLjM3XSxbMC4wMywwLDAuOTcsMF0sWzAuMDYsMCwwLjg1LDAuMDddLFswLjExLDAuOCwwLDAuMDddLFswLjQsMC4wMSwwLjU1LDAuMDFdLFswLjA5LDAuNTMsMC4zMywwLjA0XSxbMC4xMiwwLjM1LDAuMDgsMC40M10sWzAuNDQsMC4xOSwwLjI5LDAuMDZdXSwidHlwZWlkIjowLCJzY2FsZSI6MSwiaXNmcmVxIjpmYWxzZSwiZmlyc3RiYXNlIjoxLCJhbHBoYWJldCI6W3sicmVnZXgiOiJBIiwiY29sb3IiOiJyZWQifSx7InJlZ2V4IjoiQyIsImNvbG9yIjoiYmx1ZSJ9LHsicmVnZXgiOiJHIiwiY29sb3IiOiJvcmFuZ2UifSx7InJlZ2V4IjoiVCIsImNvbG9yIjoiIzIyOGIyMiJ9XX0=" alt="CTCF logo" width="50%">

If you use ReactJS, the following code creates the CTCF consensus binding logo:

```jsx
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

If you don't use React, the following code embeds the DNA logo in a `div` element:

```html
<!doctype html>
<html>
  <body>
    <script src="https://bundle.logosj.wenglab.org/bundle.js" type="text/javascript"></script>
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
