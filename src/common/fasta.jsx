const sequencesToPFM = (alphabet, symbolMap, sequences) => {
    const r = [];
    const maxLength = Math.max(...sequences.map(s => s.length));
    for (let i = 0; i < maxLength; ++i) r.push(alphabet.map(x => 0));
    sequences.forEach( sequence => {
        for (let i = 0; i < sequence.length; ++i)
            ++r[i][symbolMap[sequence[i]]];
    });
    return {
        count: sequences.length,
        pfm: r
    };
};

export const parseFASTA = (alphabet, sequence) => {
    const symbolMap = {}, sequences = [], r = [];
    alphabet.forEach( (symbol, i) => {
        symbolMap[symbol.regex] = i;
    });
    sequence.split('\n').forEach( line => {
        if (line[0] === '>')
            sequences.push("");
        else
            sequences[sequences.length - 1] += line.trim();
    });
    return sequencesToPFM(alphabet, symbolMap, sequences);
};

export const parseSequences = (alphabet, sequence) => {
    const symbolMap = {};
    alphabet.forEach( (symbol, i) => {
        symbolMap[symbol.regex] = i;
    });
    return sequencesToPFM(alphabet, symbolMap, sequence.split('\n').map(x => x.trim()));
};
