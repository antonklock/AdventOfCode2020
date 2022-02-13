const fs = require('fs');
const rawInput = fs.readFileSync('./Day1_ReportRepair/input.txt').toString('utf-8');
const regex = /\d{1,4}/gm;

const matches = [...rawInput.matchAll(regex)];

const convertedInput = matches.map(match => {
    return match[0];
})

export default convertedInput;