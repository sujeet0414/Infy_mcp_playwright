function analyzeError(error) {

    if (error.includes('Timeout')) {

        return {
            type: 'Timeout',
            suggestion: 'Increase wait time'
        };
    }

    return {
        type: 'Unknown'
    };
}

module.exports = { analyzeError };