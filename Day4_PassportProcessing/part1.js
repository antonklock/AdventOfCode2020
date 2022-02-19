const fs = require('fs');
const input = fs.readFileSync('./Day4_PassportProcessing/input.txt').toString('utf-8');
const requiredFields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];
let numberOfValidPassports = 0;

const sortedPassports = input.split(/(\r\n\r\n)/).filter(e => e !== '\r\n\r\n').map(e => {
    return e.split('\r\n').join(', ').replace(',', '').split(' ');
});

passports = sortedPassports.map(passport => {
    return passport.reduce((a, v) => ({...a, [v.split(':')[0]]: v.split(':')[1]}), {});
});

passports.forEach((passport, index) => {
    const hasAllRequiredFields = requiredFields.every(field => passport.hasOwnProperty(field));
    hasAllRequiredFields ? numberOfValidPassports++ : false;
});

console.log(`Number of valid passports: ${numberOfValidPassports}`);