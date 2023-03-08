const fs = require('fs');

const filePath = 'outline2210.txt';

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

}
