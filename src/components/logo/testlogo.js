import React from 'react';

import { xrange, onehot } from '../../common/utils';

const TestLogo = ({ alphabetSize, component }) => {
    let testmatrix = xrange(this.props.alphabetSize).map(onehot(this.props.alphabetSize));
    let C = this.props.component;
    return <C pwm={testmatrix} />;
};
export default TestLogo;
