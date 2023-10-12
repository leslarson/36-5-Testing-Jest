/** Command-line tool to generate Markov text. */

// I re-purposed my 'step3.js" script from the "36-4 Node Intro" subunit
// It just seemed so obvious to do so.

// I normally remove unnecessary comments, but are leaving them in this time to show that I reused an existing script

const fs = require('fs');
const axios = require('axios');
const process = require('process');
const {MarkovMachine} = require('./markov');

// Create a function that takes text from either the web or a file
// and runs it through the Markov Machine

function processText(text) {
    let mm = new MarkovMachine(text);
    let output = mm.makeText();
    console.log(output);

}

// function cat(fileName) {
function localText(fileName) {
    // takes a filename '
    fs.readFile(fileName, 'utf8', (err, data) => {
        if (err) {
            console.log(`Error reading ${fileName}`, err);
            process.exit(1);
        } else {
            // if (!outputFile) {
            //     console.log(data);
            // } else {
                // output to a file
                // writeFile(data);
            processText(data);
            // }
        }
    });
}

// async function webCat(url) {
async function webText(url) {
    // takes a URL and returns the text of said URL page
    try{
        const resp = await axios.get(url);
        // if (!outputFile) {
        //     console.log(resp.data);
        // } else {
            // output to a file
            // writeFile(resp.data);
        processText(resp.data);
        // }
    } catch (error) {
        console.log(error.message);
    }
}

// function writeFile(data) {
//     fs.writeFile(outputFile, data, 'utf8', (err) => {
//         if (err) {
//             console.log(err);
//             process.exit(1);
//         }
//     });
// }

// ------------------------------------------------

// Command-line format is "makeText.js file/url textSource"
// global scope variable
let outputFile = '';

// // grab the output filename if '--out' exists
// if (process.argv.indexOf('--out') != -1) {
//     outputFile = process.argv[process.argv.indexOf('--out') + 1];
// }

const fileOrUrlName = process.argv[process.argv.length-1];

// An assumption is made here: if fileOrUrlName is a URL,
// then it is assumed that it will start with 'http' or 'https'
// The arguments "file" or "url" are ignored because that filetype
// is already being determined by whether the source is a file or a url
if (fileOrUrlName.includes('http')) {
    // webCat(fileOrUrlName);
    webText(fileOrUrlName);
} else {
    // cat(fileOrUrlName);
    localText(fileOrUrlName);
}
