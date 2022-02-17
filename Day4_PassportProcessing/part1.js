const fs = require('fs');
const input = fs.readFileSync('./Day4_PassportProcessing/input.txt').toString('utf-8');

const sortedPassports = input.split(/(\r\n\r\n)/).filter(e => e !== '\r\n\r\n').map(e => {
    return e.split('\r\n').join('').split(' ').map(e => e.split(':'));
});


passports = sortedPassports.map(passport => {
    
    const pass = passport.map(entry => {
        return entry = {[entry[0]]: entry[1]};
    });

    console.log(pass);

});

// console.log(sortedPassports);
// console.log(passports);