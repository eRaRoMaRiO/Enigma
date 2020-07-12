"use strict";
let typeOfCode = 'num';
let input = document.getElementById('input');
let output = document.getElementById('output');
let radio1 = document.getElementById('radio1');
let radio2 = document.getElementById('radio2');

let radioHandler1 = (e) => {
    typeOfCode = 'num';
    inputHandler(e);
};

let radioHandler2 = (e) => {
    typeOfCode = 'let';
    inputHandler(e);
};

let inputHandler = (e) => {
    let encryptedText = '';
    let numbers = [];
    let enigmaKeys = {};
    let sourceChars = [];

    let sourceText = input.value.toLowerCase();

    for (let i = 1; i <= 33; i++) {
        if(typeOfCode === 'num'){
            numbers.push(i); 
        } else {
            numbers.push(String.fromCharCode(i + 1071)); 
        };
    };
    // console.log(enigmaKeys);
    // console.log(sourceText[0].charCodeAt());
    
    function randomInteger(min, max) {
        let rand = min + Math.random() * (max + 1 - min);
        return Math.floor(rand);
    }
    
    for (let i = 0; i < sourceText.length; i++) {
        let charCode = sourceText[i].charCodeAt();
    
        if (charCode > 1071 && charCode < 1104 || charCode === 1105) {
    
            if (sourceChars.length === 0) {
                sourceChars.push(sourceText[i]);
                // console.log(sourceChars);
    
            } else {
                let isUnique = true;
                for (let k = 0; k < sourceChars.length; k++) {
    
                    if (sourceText[i] === sourceChars[k]) {
                        isUnique = false;
                    };
                };
                if (isUnique) {
                    sourceChars.push(sourceText[i]);
                    // console.log(sourceChars);
                };
            };
        };
    };
    
    numbers.splice(sourceChars.length, numbers.length - sourceChars.length);
    
    // console.log(numbers);
    
    for (let i = 0; i < sourceChars.length; i++) {
        let randomNumber = randomInteger(0, numbers.length - 1);
        enigmaKeys[sourceChars[i]] = numbers[randomNumber];
        numbers.splice(randomNumber, 1);
    };
    
    // console.log(enigmaKeys);
    
    for (let i = 0; i < sourceText.length; i++) {
        if(enigmaKeys[sourceText[i]]) {
            // console.log(enigmaKeys[sourceText[i]]);
            encryptedText += enigmaKeys[sourceText[i]];
    
            if (enigmaKeys[sourceText[i + 1]]){
                encryptedText += '-';
            };
    
        } else {
            encryptedText += sourceText[i];
    
            if(sourceText[i] == ' '){
                encryptedText += ' ';
            };
        };
    };
    output.innerHTML = encryptedText;
};

input.addEventListener('input', inputHandler);
radio1.addEventListener('input', radioHandler1);
radio2.addEventListener('input', radioHandler2);