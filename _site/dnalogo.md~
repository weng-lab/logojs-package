## DNA logos

Perhaps the most common use case for sequence logos is the standard
DNA logo illustrating a consensus sequence. LogosJ comes with a DNALogo
component built in. Letters are colored similarly to the MEME Suite
default color scheme, and x- and y-axes are rendered alongside the logo.

To embed the DNALogo, use the `DNALogo` component in React or call the
`logosj.embedDNALogo` function. DNALogo accepts three properties:
* **pwm**: a matrix containing nucleotide frequencies at each position. Each
row is a position in the logo, and the columns are alphabetical (A, C, G, T).
* **mode**: determines how letter heights are computed; may be either
`"INFORMATION_CONTENT"` (default) or `"FREQUENCY"`.
* **startpos**: if set, the first base in the logo will be numbered with a
value other than the default of 1.

`logosj.embedDNALogo` takes two arguments:
* **div**: HTML element in which to embed the DNA logo; its `innerHTML` will be
replaced by the rendered logo.
* **properties**: an object containing the above properties.

The main page shows code examples for embedding the CTCF consensus
binding sequence logo.

## RNA logos

LogosJ also provides an RNALogo component. It uses the same color scheme
as the DNA logo (U is green) and accepts the same properties as the DNALogo.
To embed it, use the `RNALogo` React component or the `embedRNALogo` function.

The **QKI** RNA binding protein binds a consensus sequence of **ACUAAC**:
<img alt="QKI logo" src="https://logostogo.wenglab.org/svg/eyJwd20iOltbMC43LDAuMSwwLjEsMC4xXSxbMCwxLDAsMF0sWzAsMCwwLDFdLFsxLDAsMCwwXSxbMSwwLDAsMF0sWzAsMSwwLDBdLFswLjMsMC4yLDAuMywwLjJdXSwidHlwZWlkIjoxLCJzY2FsZSI6MSwiaXNmcmVxIjpmYWxzZSwiZmlyc3RiYXNlIjoxLCJnbHlwaG1hcCI6W3sicmVnZXgiOiJBIiwiY29sb3IiOiJyZWQifSx7InJlZ2V4IjoiQyIsImNvbG9yIjoiYmx1ZSJ9LHsicmVnZXgiOiJHIiwiY29sb3IiOiJvcmFuZ2UifSx7InJlZ2V4IjoiVSIsImNvbG9yIjoiIzIyOGIyMiJ9XX0=" width="300" />

To embed this logo in React:
```jsx
import { RNALogo } from 'logosj-react';
const RNA_PWM = [
  [0.7,0.1,0.1,0.1],
  [0,1,0,0],
  [0,0,0,1],
  [1,0,0,0],
  [1,0,0,0],
  [0,1,0,0],
  [0.3,0.2,0.3,0.2]
];

export const QKILogo = props => (
    <RNALogo pwm={RNA_PWM} />
);
```

Or without React:
```html
<!doctype html>
<html>
  <body>
    <script src="https://package.logosj.wenglab.org/bundle.js" type="text/javascript"></script>
    <div id="logo" style="width:500px"></div>
    <script type="text/javascript">
      const RNA_PWM = [
        [0.7,0.1,0.1,0.1]
        [0,1,0,0]
        [0,0,0,1]
        [1,0,0,0]
        [1,0,0,0]
        [0,1,0,0]
        [0.3,0.2,0.3,0.2]
      ];
      logosj.embedRNALogo(document.getElementById("logo"), {
        pwm: RNA_PWM
      });
    </script>
  </body>
</html>
```
