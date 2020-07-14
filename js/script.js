"use strict";

let typeOfCode = 'num';
let langOfText = 'rus';
const input = document.querySelector('#input');
const output = document.querySelector('#output');
const radioType = document.querySelectorAll('.radioType');
const radioLang = document.querySelectorAll('.radioLang');

function randomInteger(min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}

function isCharInRange(char) {
    if (langOfText === 'rus') {
        if (char.charCodeAt() > 1071 && char.charCodeAt() < 1104 ||
            char.charCodeAt() === 1105) {
            return true;
        };
    } else {
        if (char.charCodeAt() > 96 && char.charCodeAt() < 123) {
            return true;
        };
    };
}

function getChar(i) {
    if (typeOfCode === 'num') {
        return (i + 1);
    } else if (langOfText === 'rus') {
        return i !== 33 ? String.fromCharCode(i + 1072) : (String.fromCharCode(1105));
    } else {
        return String.fromCharCode(i + 97)
    };
}

const radioHandler1 = (e) => {
    typeOfCode = e.target.value;
    inputHandler();
};

const radioHandler2 = (e) => {
    langOfText = e.target.value;
    console.log(langOfText);
    inputHandler();
};

const inputHandler = (e) => {
    const sourceText = input.value.toLowerCase();
    let encryptChars = [];
    let encryptKeys = {}; 
    let encryptedText = '';

    for (let char of sourceText) {
        if (isCharInRange(char) && !encryptKeys.hasOwnProperty(char)) {
            encryptKeys[char] = ' ';
        };
    };

    for (let i = 0; i < Object.keys(encryptKeys).length; i++) {
            encryptChars.push(getChar(i));
    };

    for (let key in encryptKeys) {
        let randomNumber = randomInteger(0, encryptChars.length - 1);
        encryptKeys[key] = encryptChars[randomNumber];
        encryptChars.splice(randomNumber, 1);
    };

    for (let i = 0; i < sourceText.length; i++) {
        if (encryptKeys[sourceText[i]]) {
            encryptedText += encryptKeys[sourceText[i]];

            if (encryptKeys[sourceText[i + 1]] && typeOfCode === 'num') {
                encryptedText += '-';
            };

        } else {
            encryptedText += sourceText[i];

            //double space for easy reading
            if (sourceText[i] == ' ' && typeOfCode === 'num') {
                encryptedText += ' ';
            };
        };
    };
    
    output.innerHTML = encryptedText;
};

// browser events
for (let radio of radioType) {
    radio.addEventListener('input', radioHandler1);
};

for (let radio of radioLang) {
    radio.addEventListener('input', radioHandler2);
};

input.addEventListener('input', inputHandler);