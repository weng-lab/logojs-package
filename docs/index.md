---
title: 'LogosJ: embeddable vector sequence logos'
---

LogosJ is a Javascript package for creating, embedding, and sharing
biological sequence logos. The package supports a wide range of custom
logo types, alphabets, and annotations in addition to common DNA and
protein logos. All logos are rendered as vector graphics to facilitate
downstream customization and figure generation. Our
[companion webapp](https://logosj.wenglab.org) supports batch conversion
of output from common tools such as the MEME Suite.

Looking for some quick examples to get started? Our companion website has
a [gallery](https://logosj.wenglab.org/app/gallery) of common and advanced
logos with the code to render them, both with and without
[ReactJS](https://reactjs.org/).

## Quick Example

Creating a React component which renders the consensus sequence for CTCF
requires just a few lines of code:

```jsx
import { DNALogo } from 'logosj-react';

const CTCF_PWM = [
  [0.09, 0.31, 0.08, 0.50], [0.18, 0.15, 0.45, 0.20], [0.30, 0.05, 0.49, 0.14],
  [0.06, 0.87, 0.02, 0.03], [0.00, 0.98, 0.00, 0.02], [0.81, 0.01, 0.07, 0.09], 
  [0.04, 0.57, 0.36, 0.01], [0.11, 0.47, 0.05, 0.35], [0.93, 0.01, 0.03, 0.01],
  [0.00, 0.00, 0.99, 0.01], [0.36, 0.00, 0.64, 0.00], [0.05, 0.01, 0.55, 0.37], 
  [0.03, 0.00, 0.97, 0.00], [0.06, 0.00, 0.85, 0.07], [0.11, 0.80, 0.00, 0.07],
  [0.40, 0.01, 0.55, 0.01], [0.09, 0.53, 0.33, 0.04], [0.12, 0.35, 0.08, 0.43], 
  [0.44, 0.19, 0.29, 0.06]
];

export const CTCFLogo = props => (
    <DNALogo pwm={CTCF_PWM} />
);
```

A `<CTCFLogo />` tag will then give you the CTCF logo:

<img alt="CTCF logo" src="https://logostogo.wenglab.org/svg/eyJwd20iOltbMC4wOSwwLjMxLDAuMDgsMC41XSxbMC4xOCwwLjE1LDAuNDUsMC4yXSxbMC4zLDAuMDUsMC40OSwwLjE0XSxbMC4wNiwwLjg3LDAuMDIsMC4wM10sWzAsMC45OCwwLDAuMDJdLFswLjgxLDAuMDEsMC4wNywwLjA5XSxbMC4wNCwwLjU3LDAuMzYsMC4wMV0sWzAuMTEsMC40NywwLjA1LDAuMzVdLFswLjkzLDAuMDEsMC4wMywwLjAxXSxbMCwwLDAuOTksMC4wMV0sWzAuMzYsMCwwLjY0LDBdLFswLjA1LDAuMDEsMC41NSwwLjM3XSxbMC4wMywwLDAuOTcsMF0sWzAuMDYsMCwwLjg1LDAuMDddLFswLjExLDAuOCwwLDAuMDddLFswLjQsMC4wMSwwLjU1LDAuMDFdLFswLjA5LDAuNTMsMC4zMywwLjA0XSxbMC4xMiwwLjM1LDAuMDgsMC40M10sWzAuNDQsMC4xOSwwLjI5LDAuMDZdXSwidHlwZWlkIjowLCJzY2FsZSI6MSwiaXNmcmVxIjpmYWxzZSwiZmlyc3RiYXNlIjoxLCJnbHlwaG1hcCI6W3sicmVnZXgiOiJBIiwiY29sb3IiOiJyZWQifSx7InJlZ2V4IjoiQyIsImNvbG9yIjoiYmx1ZSJ9LHsicmVnZXgiOiJHIiwiY29sb3IiOiJvcmFuZ2UifSx7InJlZ2V4IjoiVCIsImNvbG9yIjoiIzIyOGIyMiJ9XX0=" width="400" />


You don't need to use React:

```html
<!doctype html>
<html>
  <body>
    <script src="https://package.logosj.wenglab.org/bundle.js" type="text/javascript"></script>
    <div id="logo" style="width:500px"></div>
    <script type="text/javascript">
      const CTCF_PWM = [
        [0.09, 0.31, 0.08, 0.50], [0.18, 0.15, 0.45, 0.20], [0.30, 0.05, 0.49, 0.14],
        [0.06, 0.87, 0.02, 0.03], [0.00, 0.98, 0.00, 0.02], [0.81, 0.01, 0.07, 0.09], 
        [0.04, 0.57, 0.36, 0.01], [0.11, 0.47, 0.05, 0.35], [0.93, 0.01, 0.03, 0.01],
        [0.00, 0.00, 0.99, 0.01], [0.36, 0.00, 0.64, 0.00], [0.05, 0.01, 0.55, 0.37], 
        [0.03, 0.00, 0.97, 0.00], [0.06, 0.00, 0.85, 0.07], [0.11, 0.80, 0.00, 0.07],
        [0.40, 0.01, 0.55, 0.01], [0.09, 0.53, 0.33, 0.04], [0.12, 0.35, 0.08, 0.43], 
        [0.44, 0.19, 0.29, 0.06]
      ];
      logosj.embedDNALogo(document.getElementById("logo"), { pwm: CTCF_PWM });
    </script>
  </body>
</html>
```


LogosJ supports many other common and custom logo types out of
the box. Use the links at left to see details and advanced use case
examples.
