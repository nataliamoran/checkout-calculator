const toCurrency = (num) => {
    return Number(Number.parseFloat(num).toFixed(2));
};

module.exports = toCurrency;