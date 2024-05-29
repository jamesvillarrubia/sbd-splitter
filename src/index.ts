import * as tokenizer from 'sbd';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';

export class SbdSplitter extends RecursiveCharacterTextSplitter {
    constructor(options) {
        super({
            chunkSize: 1000, // Absolute max chunk size
            keepSeparator: true,
            delimeters: ['.', '?', '!'],
            ...options
        });
        this.sbd_marker = options.sbd_marker || '&#&#&#';
        this.softMaxChunkSize = options.softMaxChunkSize || 800;
        this.delimeters = [this.sbd_marker, ' ',''];
        this.sbd_options = {
            newline_boundaries: false,
            html_boundaries: false,
            sanitize: false,
            allowed_tags: false,
            preserve_whitespace: true,
            abbreviations: null,
            ...options.sbd_options
        };
    }

    /**
     * Splits the input text into sentences using the tokenizer and then processes the text to split it further.
     * @param {string} text - The input text to be split.
     * @param {object} options - Additional options for splitting.
     * @returns {Promise<string[]>} - An array of split text chunks.
     */
    async splitText(text, options = {}) {
        // Tokenize the text into sentences
        text = tokenizer.sentences(text, this.sbd_options);
        // Join the sentences with the sentence boundary marker
        text = text.join(this.sbd_marker);
        const regex = new RegExp(this.sbd_marker, 'g');
        // Split the text further using the defined separators
        return (await this._splitText(text, this.separators)).map(c => c.replace(regex, ''));
    }

    /**
     * Merges the split text chunks into larger chunks while respecting the chunkSize and softMaxChunkSize limits.
     * @param {string[]} splits - The array of split text chunks.
     * @param {string} separator - The separator to use when joining chunks.
     * @returns {Promise<string[]>} - An array of merged text chunks.
     */


async mergeSplits(splits, separator, max) {
    max = max || this.softMaxChunkSize
    const docs = []; // Array to store the final merged documents
    let currentDoc = []; // Array to store the current document being built
    let total = 0; // Total length of the current document

    for (const d of splits) {
        const _len = await this.lengthFunction(d); // Length of the current split

        // Check if adding the current split would exceed the chunk size
        // allows one additional chunk past the softMax but not pas the chunkSize
        if (total >  max || total + _len > this.chunkSize) { 

            // If the current document has content, join and add it to the docs array
            if (currentDoc.length > 0) {
                const doc = this.joinDocs(currentDoc, separator);
                if (doc !== null) {
                    docs.push(doc);
                    currentDoc = []; // Reset the current document
                    total = 0;
                }
            }
        }

        currentDoc.push(d); // Add the current split to the current document
        total += _len; // Update the total length of the current document
    }

    // Join and add the last document if it has content
    const doc = this.joinDocs(currentDoc, separator);
    if (doc !== null) {
        docs.push(doc);
    }

    return docs; // Return the array of merged documents
}

    /**
     * Recursively splits the text based on the provided separators and merges the splits into chunks.
     * @param {string} text - The input text to be split.
     * @param {string[]} separators - The array of separators to use for splitting.
     * @returns {Promise<string[]>} - An array of final text chunks.
     */
    async _splitText(text, separators) {
        const finalChunks = [];
    
        // Get appropriate separator to use
        let separator = separators[separators.length - 1];
        let newSeparators;
        for (let i = 0; i < separators.length; i += 1) {
            const s = separators[i];
            if (s === "") {
                separator = s;
                break;
            }
            if (text.includes(s)) {
                separator = s;
                newSeparators = separators.slice(i + 1);
                break;
            }
        }       
        
        let postSBDseparators = separators.slice(separators.indexOf(this.sbd_marker)+1);
        // Now go merging things, recursively splitting longer texts.
        let goodSplits = [];
        let _separator = this.keepSeparator ? "" : separator;
        // Now that we have the separator, split the text
        let splits = this.splitOnSeparator(text, separator);


        if(separator === this.sbd_marker) {
            let original = this.keepSeparator
            this.keepSeparator = false // never keep the SBD marker in splits
            splits = this.splitOnSeparator(text, separator); 
            this.keepSeparator = original
            // _separator = this.sbd_marker;

        }
        
        let max = postSBDseparators.includes(separator) ? this.chunkSize : this.softMaxChunkSize

        for (const s of splits) {
            const length = await this.lengthFunction(s);
            // If the chunk is smaller than the softMaxChunkSize, add to goodSplits
            if (length < max) { // the only key difference here 
                goodSplits.push(s);
            } else { 
                // If there are goodSplits, merge them and add to finalChunks
                if (goodSplits.length) {
                    const mergedText = await this.mergeSplits(goodSplits, _separator);
                    finalChunks.push(...mergedText);
                    goodSplits = [];
                }
                // If no more separators, add the chunk to finalChunks
                if (!newSeparators) {
                    finalChunks.push(s);
                // Otherwise, recursively split the chunk
                } else {
                    const otherInfo = await this._splitText(s, newSeparators);
                    finalChunks.push(...otherInfo);
                }
            }
        }
        // Merge any remaining goodSplits and add to finalChunks
        if (goodSplits.length) {
            const mergedText = await this.mergeSplits(goodSplits, _separator, max);
            finalChunks.push(...mergedText);
        }
        return finalChunks;
    }
}