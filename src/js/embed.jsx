import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

import DNALogo from '../components/logo/dnalogo';
import RNALogo from '../components/logo/rnalogo';
import AALogo from '../components/logo/aalogo';
import Logo, { RawLogo } from '../components/logo/logo';

export const embedDNALogo = (div, props) => {
    div.innerHTML = renderToStaticMarkup(<DNALogo {...props} />);
};

export const embedRNALogo = (div, props) => {
    div.innerHTML = renderToStaticMarkup(<RNALogo {...props} />);
};

export const embedProteinLogo = (div, props) => {
    div.innerHTML = renderToStaticMarkup(<AALogo {...props} />);
};

export const embedLogo = (div, props) => {
    div.innerHTML = renderToStaticMarkup(<Logo {...props} />);
};

export const embedRawLogo = (container, props) => {
    container.innerHTML = renderToStaticMarkup(<RawLogo {...props} />);
};
