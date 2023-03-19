const pdfjsLib = require('pdfjs-dist');
const txtgen = require('txtgen');

// Load the PDF file using pdfjs-dist
const pdfUrl = 'outline2210.pdf';
const pdf = pdfjsLib.getDocument(pdfUrl).promise;

// Loop through each page and extract the text
let text = '';
for (let i = 1; i <= pdf.numPages; i++) {
    const page = pdf.getPage(i);
    const content = page.getTextContent();
    text += content.items.map(item => item.str).join(' ');
}

// Convert the text to a readable format using txtgen
const readableText = txtgen.parse(text);

// Save the readable text to a file
const fs = require('fs');
fs.writeFileSync('output.txt', readableText);


// Read the file contents as a string
const data = fs.readFileSync(filePath, 'utf-8');

const datePatterns = [
    /\b(January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2}(\s*,\s*\d{2,4})?\b/gi, // matches dates in the format "Month Day, Year" or "Month Day"
    /\b(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)\s+(January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2},?\s+\d{4}\b/gi // matches dates in the format "Weekday Month Day, Year"
];

const keywordPatterns = [
    /\b(assignment|quiz|test|exam|lab|midterm)s?\b/gi // matches any of the listed keywords, with optional pluralization
];

// Process the text data to find events and dates
processTextFile(data);

function processTextFile(data) {
    const dates = [];
    const events = [];

    // Find all the dates and keywords
    for (const pattern of [...datePatterns, ...keywordPatterns]) {
        const matches = data.matchAll(pattern);
        if (matches) {
            for (const match of matches) {
                if (datePatterns.includes(pattern)) {
                    dates.push(match);
                } else {
                    events.push(match);
                }
            }
        }
    }

    // Sort the dates and events by index in the text
    dates.sort((a, b) => a.index - b.index);
    events.sort((a, b) => a.index - b.index);

    const output = [];

    // Find the keyword for each date
    for (const date of dates) {
        let keyword = '';

        // Look for a keyword on the same line as the date
        const lineStart = data.lastIndexOf('\n', date.index) + 1;
        const lineEnd = data.indexOf('\n', date.index);
        const line = data.slice(lineStart, lineEnd > -1 ? lineEnd : undefined);
        const keywordMatch = line.match(keywordPatterns[0]);
        if (keywordMatch) {
            keyword = keywordMatch[0];
        } else {
            // Look for the nearest keyword by character distance
            let closestDist = Infinity;
            for (const event of events) {
                const dist = Math.abs(date.index - event.index);
                if (dist < closestDist) {
                    closestDist = dist;
                    keyword = event[0];
                }
            }
        }

        output.push(`${date[0]} - ${keyword}`);
    }

    console.log('Dates and keywords found:', output);

    let patternName = /(Professor|Dr\.|Lecturer|Instructor|TA|Teaching Assistant|Dr|Prof\.?)\s+([A-Z][a-z]+ \b[A-Z][a-z]+)/g;

    let matchName = data.matchAll(patternName);

    for (const match of matchName) {
        console.log(match[1] + ": " + match[2]);
    }

    let patternEmail = /\b\w+@\w+\.uwo\.ca\b/;

    let matchEmail = data.match(patternEmail);

    if (matchEmail) {
        let email = matchEmail[0];
        console.log("Email: " + email);
    }

    let patternTime = /(\d{1,2}:\d{2})(am|pm)?/g;

    let matchTime = data.matchAll(patternTime);

    for (const match of matchTime) {
        let time = match[1] + (match[2] ? match[2] : "");
        console.log("Lecture Time: " + time);
    }


    let patternLoc = /at\s+([A-Z][a-z]*)(\s[A-Z][a-z]*)?\b/g;


    let matchLoc = data.matchAll(patternLoc);

    for (const match of matchLoc) {
        let location = match[1];
        console.log("Location: " + location);
    }


    const lines = data.split("\n");
    const lineWithEdition = lines.find(line => line.includes("edition"));

    if (lineWithEdition) {
        console.log("Textbook:", lineWithEdition);
    }


}
