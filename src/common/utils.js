export const INFORMATION_CONTENT = 'INFORMATION_CONTENT';
export const FREQUENCY = 'FREQUENCY';

export const logLikelihood = ( alphabetSize ) => ( r ) => {
    let sum = 0.0;
    r.map( x => ( sum += x === 0 ? 0 : x * Math.log2(x * alphabetSize) ) );
    return r.map( x => x * sum );
};

export const sortedIndices = ( x ) => {
    let indices = x.map( (_, i) => i);
    return indices.sort( (a, b) => (
	x[a] < x[b] ? -1 : (x[a] === x[b] ? 0 : 1)
    ));
}

export const sortedIndicesNegative = ( x ) => {
    let indices = x.map( (_, i) => i);
    return indices.sort( (a, b) => (
	x[a] < x[b] ? 1 : (x[a] === x[b] ? 0 : -1)
    ));
}

export const xrange = ( n ) => (
    [...Array(Math.floor(n)).keys()]
);

export const onehot = ( l ) => ( x ) => (
    xrange(l).map( (_, i) => i === x ? 1 : 0 )
);

export const possum = x => {
    let s = 0.0;
    x.filter(x => x > 0.0).forEach(x => { s += x });
    return s;
};

export const negsum = x => {
    let s = 0.0;
    x.filter(x => x < 0.0).forEach(x => { s += x });
    return s;
};
