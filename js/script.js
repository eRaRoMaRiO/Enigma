"use strict";

let typeOfCode = 'let';
let langOfText = 'rus';
let sourceText = '';
let encryptKeys = {};
let encryptedText = '';
let solutionText = [];

const input = document.querySelector('#input');
const outputText = document.querySelector('#encryptedText');
const outputSolution = document.querySelector('#solutionText');
const radioType = document.querySelectorAll('.radioType');
const radioLang = document.querySelectorAll('.radioLang');
const solutionChars = document.querySelectorAll('.solutionChar');
const hintButton = document.querySelector('#hintButton');

function randomInteger(min, max) {
    let rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
}

function isCharIsLetter(char) {
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

function checkChar(inputChar, outputChar) {

    for (let i = 0; i < encryptedText.length; i++) {
        if (encryptedText[i] === inputChar) {
            solutionText[i] = outputChar ? outputChar : "_";
        };
    };

    outputSolution.innerHTML = solutionText.join('');
}

const hintHandler = () => {
    const chars = Object.keys(encryptKeys);
    const randomChar = chars[randomInteger(0, Object.keys(encryptKeys).length)];

    for (let char of solutionChars) {
        const letter = char.getAttribute('value')
        if (encryptKeys[randomChar] === letter) {
            char.value = randomChar;
            char.setAttribute("disabled", "disabled");
            char.classList.add('hint');
            checkChar(letter, randomChar);
            console.log (letter, randomChar);
        }
    };
};

const radioHandler1 = (e) => {
    typeOfCode = e.target.value;
    inputHandler(e);
};

const radioHandler2 = (e) => {
    langOfText = e.target.value;
    inputHandler(e);
};

const inputHandler = (e) => {
    sourceText = input.value.toLowerCase();
    let encryptChars = [];
    encryptKeys = {};
    encryptedText = '';
    solutionText = [];

    for (let char of sourceText) {
        if (isCharIsLetter(char) && !encryptKeys.hasOwnProperty(char)) {
            encryptKeys[char] = ' ';
        };
    };

    for (let i = 0; i < Object.keys(encryptKeys).length; i++) {
        encryptChars.push(getChar(i));
    };

    for (let key in encryptKeys) {
        let randomNumber = randomInteger(0, encryptChars.length - 1);
        encryptKeys[key] = encryptChars.splice(randomNumber, 1)[0];
    };

    for (let i = 0; i < sourceText.length; i++) {
        if (encryptKeys[sourceText[i]]) {
            encryptedText += encryptKeys[sourceText[i]];
            solutionText.push('_');

            if (encryptKeys[sourceText[i + 1]] && typeOfCode === 'num') {
                encryptedText += '-';
            };

        } else {
            encryptedText += sourceText[i];
            solutionText.push(sourceText[i]);

            if (sourceText[i] == ' ' && typeOfCode === 'num') {
                encryptedText += ' ';
            };
        };
    };

    outputText.innerHTML = encryptedText;
    outputSolution.innerHTML = solutionText.join('');
};

const charHandler = (e) => {
    let inputChar = e.target.getAttribute('value');
    let outputChar = e.target.value;

    checkChar(inputChar, outputChar);
}

// browser events
for (let radio of radioType) {
    radio.addEventListener('input', radioHandler1);
};

for (let radio of radioLang) {
    radio.addEventListener('input', radioHandler2);
};

input.addEventListener('input', inputHandler);
hintButton.addEventListener('click', hintHandler);

for (let char of solutionChars) {
    char.addEventListener('input', charHandler);
};