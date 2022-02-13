const fs = require('fs');
const input = fs.readFileSync('./Day2_PasswordPhilosophy/passwords.txt').toString('utf-8');
const regex = /^(\d{1,})-(\d{1,}) ([a-z]): ([a-z]{1,})$/gm;
let numberOfValidPasswords = 0;

const matches = [...input.matchAll(regex)];

function isPasswordValid( match ){
    const min = match[1] - 1;
    const max = match[2] - 1;
    const letter = match[3];
    const password = match[4];

    const array = password.split('');

    if(array[min] !== letter && array[max] === letter){
        return true;
    } else if(array[min] === letter && array[max] !== letter){
        return true;
    } else if(array[min] !== letter && array[max] !== letter){
        return false;
    } else if(array[min] === letter && array[max] === letter){
        return false;
    } else {
        return false;
    }
}

for(let i = 0; i < matches.length; i++){
    if(isPasswordValid(matches[i])){
        numberOfValidPasswords++;
    }
}

console.log("Number of passwords: " + matches.length);
console.log("Number of VALID passwords: " + numberOfValidPasswords);