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
    if(!(index % 2)){
        const hasAllRequiredFields = requiredFields.every(field => passport.hasOwnProperty(field));
        hasAllRequiredFields ? numberOfValidPassports++ : false;
    } else {
        const hasAllRequiredFields = requiredFields.every(field => passport.hasOwnProperty(field));
        if(hasAllRequiredFields){
            const checks = [];
            const eyeColors = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'];

            checks.push(numberIsBetween(parseInt(passport.byr), 1920, 2002, 4));
            checks.push(numberIsBetween(parseInt(passport.iyr), 2010, 2020, 4));
            checks.push(numberIsBetween(parseInt(passport.eyr), 2020, 2030, 4));

            if(passport.hgt.endsWith('cm')){
                checks.push(numberIsBetween(parseInt(passport.hgt), 150, 193));
            }else if(passport.hgt.endsWith('in')){
                checks.push(numberIsBetween(parseInt(passport.hgt), 59, 76));
            } else {
                checks.push(false);
            }

            passport.hcl = passport.hcl.replace(',', '');
            checks.push(isHairColor(passport.hcl));

            passport.ecl = passport.ecl.replace(',', '');
            checks.push(eyeColors.some(e => e === passport.ecl));

            passport.pid = passport.pid.replace(',', '');
            checks.push(isNumberOfDigits(parseInt(passport.pid), 9));

            console.log(`pid: ${passport.pid} is ${checks[6]}`);

            if(checks.every(e => e === true)){
                numberOfValidPassports++;
            }
        }
    }
});

function isHairColor(input){
    const validChars = ['a', 'b', 'c', 'd', 'e', 'f', '0', '1', '2', '3', '4','5','6','7','8','9'];
    if(input.toString().length === 7){
        if(input.startsWith('#')){
            const chars = input.split('');
            return chars.every(e => {
                if(e === '#'){
                    return true;
                } else if(validChars.some(char => char === e)){
                    // console.log(e + ' is a valid char ');
                    return true
                } else {
                    return false;
                }
            });
        } else {
            return false;
        }
    } else {
        return false;
    }
}

function numberIsBetween(number, min, max, numberOfDigits){
    if(number.toString().length !== numberOfDigits){
        if(numberOfDigits){
            return false;
        }
    }
    if(number >= min && number <= max){
        return true;
    } else {
        return false;
    }
}

function isNumberOfDigits(number, numberOfDigits){
    console.log(number.toString());
    if(number.toString().length === numberOfDigits){
        
        return true;
    } else {
        return false;
    }
}

console.log(`Number of valid passports: ${numberOfValidPassports}`);