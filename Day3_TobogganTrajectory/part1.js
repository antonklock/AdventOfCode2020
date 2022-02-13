const fs = require('fs');
const input = fs.readFileSync('./Day3_TobogganTrajectory/map.txt').toString('utf-8');
const regex = /^.*$/gm;

const rows = [...input.matchAll(regex)].filter(rows => rows[0] != '');

function tryRun(slopeArray, horizontalSpeed, verticalSpeed, printMap){
    let x = 0;
    let y = verticalSpeed;
    let numberOfTrees = 0;

    slopeMap = slopeArray.map((row, index) => {
        if(index === y){
            const singleRow = row[0];
            if(singleRow){
                x += horizontalSpeed;
                x = x % 31;
                y += verticalSpeed;
                let checkedRow = singleRow.split('').map((symbol, index) => {
                    if(index !== x){
                        return symbol;
                    } else {
                        if(symbol === "."){
                            return "O";
                        } else {
                            numberOfTrees++;
                            return "X";
                        }
                    }
                })
                return checkedRow.join('');
            }
        } else {
            if(row[0]){
                return row[0];
            }
        }
    }).filter(row => row !== undefined);

    if(printMap){
        console.log(slopeMap);
    }

    return numberOfTrees;
}

const numTreesFirstRun = tryRun(rows, 1, 1, false);
const numTreesSecondRun = tryRun(rows, 3, 1, false);
const numTreesThirdRun = tryRun(rows, 5, 1, false);
const numTreesFourthRun = tryRun(rows, 7, 1, false);
const numTreesFifthRun = tryRun(rows, 1, 2, false);

console.log("Total number of trees: " + (
    numTreesFirstRun * 
    numTreesSecondRun * 
    numTreesThirdRun * 
    numTreesFourthRun * 
    numTreesFifthRun
    ));