import React from 'react';
import { renderToStaticMarkup } from 'react-dom';

import DNALogo from '../components/logo/dnalogo';

export const embedDNALogo = (div, props) => {
    div.innerHTML = renderToStaticMarkup(<DNALogo {...props} />);
};
