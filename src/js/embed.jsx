import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

import DNALogo from '../components/logo/dnalogo';
import RNALogo from '../components/logo/rnalogo';
import ProteinLogo from '../components/logo/proteinlogo';
import LogoWithNegatives from '../components/logo/logowithnegatives';
import Logo, { RawLogo } from '../components/logo/logo';

/**
 * Imperatively embeds a DNA logo in a div; intended for use outside of a React application.
 *
 * @param div the div element in which to embed the DNA logo.
 * @param props object containing the logo's properties.
 */
export const embedDNALogo = (div, props) => {
    div.innerHTML = renderToStaticMarkup(<DNALogo {...props} />);
};

/**
 * Imperatively embeds a RNA logo in a div; intended for use outside of a React application.
 *
 * @param div the div element in which to embed the RNA logo.
 * @param props object containing the logo's properties.
 */
export const embedRNALogo = (div, props) => {
    div.innerHTML = renderToStaticMarkup(<RNALogo {...props} />);
};

/**
 * Imperatively embeds a protein logo in a div; intended for use outside of a React application.
 *
 * @param div the div element in which to embed the protein logo.
 * @param props object containing the logo's properties.
 */
export const embedProteinLogo = (div, props) => {
    div.innerHTML = renderToStaticMarkup(<ProteinLogo {...props} />);
};

/**
 * Imperatively embeds a logo in a div; intended for use outside of a React application.
 *
 * @param div the div element in which to embed the logo.
 * @param props object containing the logo's properties.
 */
export const embedLogo = (div, props) => {
    div.innerHTML = renderToStaticMarkup(<Logo {...props} />);
};

/**
 * Imperatively embeds a raw logo in a div; intended for use outside of a React application.
 *
 * @param div the div element in which to embed the raw logo.
 * @param props object containing the logo's properties.
 */
export const embedRawLogo = (container, props) => {
    container.innerHTML = renderToStaticMarkup(<RawLogo {...props} />);
};

/**
 * Imperatively embeds a logo with negative symbols in a div;
 * intended for use outside of a React application.
 *
 * @param div the div element in which to embed the logo.
 * @param props object containing the logo's properties.
 */
export const embedLogoWithNegatives = (container, props) => {
    container.innerHTML = renderToStaticMarkup(<LogoWithNegatives {...props} />);
};
