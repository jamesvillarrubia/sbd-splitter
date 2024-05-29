import { describe, beforeEach, afterEach, it } from 'node:test';
import { expect } from 'chai';
import { SbdSplitter } from '../../src/index.js';

describe('Recursive Text Splitter', () => {
    const delimiters = [
        "\n# ",
        "\n## ",
        "\n### ",
        "\n#### ",
        "\n##### ",
        "\n###### ",
        "```\n\n",
        "\n\n***\n\n",
        "\n\n---\n\n",
        "\n\n___\n\n",
        "\n\n",
        "\n",
        "&#&#&#",
        " ",
        "",
    ];

    const testCases = [
       
        /**************** BASIC LENGTHS ******************/

        {
            description: 'should not soft break at words if there are no sentences',
            splitterConfig: { chunkSize: 80, chunkOverlap: 0, separators: delimiters, softMaxChunkSize: 30 },
            text: 'A simple sentence B simple sentence C simple sentence',
            expected: ['A simple sentence B simple sentence C simple sentence']
        },
        {
            description: 'should hard break at words if there are no sentences',
            splitterConfig: { chunkSize: 35, chunkOverlap: 0, separators: delimiters, softMaxChunkSize: 0 },
            text: 'A simple sentence B simple sentence C simple sentence',
            expected: ['A simple sentence B simple sentence', 'C simple sentence']
        },
        {
            description: 'should hard break at long strings',
            splitterConfig: { chunkSize: 10, chunkOverlap: 0, separators: delimiters, softMaxChunkSize: 0 },
            text: 'AAAAAAAAAAAAAAA',
            expected: ['AAAAAAAAAA', 'AAAAA']
        },
        {
            description: 'should not soft break at long strings',
            splitterConfig: { chunkSize: 80, chunkOverlap: 0, separators: delimiters, softMaxChunkSize: 10 },
            text: 'AAAAAAAAAAAAAAA',
            expected: ['AAAAAAAAAAAAAAA']
        },

        /**************** SENTENCES ******************/
        {
            description: 'should allow sentence longer than softmax, shorter than max',
            splitterConfig: { chunkSize: 80, chunkOverlap: 0, separators: delimiters, softMaxChunkSize: 30 },
            text: 'A simple sentence. B simple sentence. C simple sentence.',
            expected: ['A simple sentence. B simple sentence.', 'C simple sentence.']
        },
        {
            description: 'should break at exactly softmax',
            splitterConfig: { chunkSize: 80, chunkOverlap: 0, separators: delimiters, softMaxChunkSize: 37 },
            text: 'A simple sentence. B simple sentence. C simple sentence.',
            expected: ['A simple sentence. B simple sentence.', 'C simple sentence.']
        },
        {
            description: 'should not exceed hardmax',
            splitterConfig: { chunkSize: 40, chunkOverlap: 0, separators: delimiters, softMaxChunkSize: 40 },
            text: 'A simple sentence. B simple sentence. C simple sentence.',
            expected: ['A simple sentence. B simple sentence.', 'C simple sentence.']
        },
        {
            description: 'should split long text into multiple chunks.',
            splitterConfig: { chunkSize: 80, chunkOverlap: 0, separators: delimiters, softMaxChunkSize: 50 },
            text: `This is a simple sentence. This is simple sentence. This is a third simple sentence This is a fourth simple sentence This is a fifth simple sentence. This is a sixth simple sentence. This is a seventh simple sentence. This is an eighth simple sentence. This is a ninth simple sentence. This is a tenth simple sentence.`,
            expected: [
                'This is a simple sentence. This is simple sentence.',
                'This is a third simple sentence This is a fourth simple sentence This is a fifth',
                'simple sentence.', // hard max cutoff.  
                'This is a sixth simple sentence. This is a seventh simple sentence.',
                'This is an eighth simple sentence. This is a ninth simple sentence.',
                'This is a tenth simple sentence.'
            ]
        },
        
        /**************** MARKDOWN ******************/

        {
            description: 'should split text with markdown and break points less than softmax',
            splitterConfig: { chunkSize: 80, chunkOverlap: 0, separators: delimiters, softMaxChunkSize: 10 },
            text: `# Header\nThis is a short sentence.`,
            expected: ['# Header', 'This is a short sentence.']
        },
        {
            description: 'should split text with markdown and break points between softmax and max',
            splitterConfig: { chunkSize: 90, chunkOverlap: 0, separators: delimiters, softMaxChunkSize: 55 },
            text: `# Header\nThis is a sentence that is long enough to be between the softmax and max chunk sizes.`,
            expected: ['# Header', 'This is a sentence that is long enough to be between the softmax and max chunk sizes.']
        },
        {
            description: 'should split text with markdown and break points longer than max',
            splitterConfig: { chunkSize: 90, chunkOverlap: 0, separators: delimiters, softMaxChunkSize: 55 },
            text: `# Header\nThis is a very long sentence that will definitely exceed the maximum chunk size and will need to be split into multiple chunks to fit within the constraints of the chunk size.`,
            expected: [
                '# Header',
                'This is a very long sentence that will definitely exceed the maximum chunk size and will',
                'need to be split into multiple chunks to fit within the constraints of the chunk size.'
            ]
        },
        
        /**************** Full Suite ******************/

        {
            description: 'should split text with markdown headers',
            splitterConfig: { chunkSize: 90, chunkOverlap: 0, separators: delimiters, softMaxChunkSize: 55, keepSeparator: true },
            text: `a`.repeat(95) + `. Firstt sentence goes here. Second sentence goes here. Thirdd sentence goes here. Fourth sentence goes here. Fifthh sentence goes here.   Firstt sentence goes here Firstt sentence goes here Second sentence goes here here Second sentence goes here \n## Second Section Title is also really long and goes past the soft max. \n### third Section Title is also really long and goes past the soft max and past the chunk size by quite a bit, in fact it should stop here. \n## Fourth Section\nThis is the second section.  It has two short sentences.  And one lonnnnnnnnnnnnnnnnnnng run on sentence that seems to go on forever but it can't be stopped, oh no it just keeps on going and going and going.`,
            expected: [
                // breaks on hard max length
                'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                'aaaaa.',
                // breaks on softmax
                'Firstt sentence goes here. Second sentence goes here. Thirdd sentence goes here.',
                'Fourth sentence goes here. Fifthh sentence goes here.',
                // breaks on hard max with spaces
                'Firstt sentence goes here Firstt sentence goes here Second sentence goes here here Second',
                'sentence goes here',
                // breaks on softmax
                '## Second Section Title is also really long and goes past the soft max.',
                // breaks on hardmax
                '### third Section Title is also really long and goes past the soft max and past the chunk',
                'size by quite a bit, in fact it should stop here.',
                // breaks on \n 
                '## Fourth Section',
                // breaks on soft max
                'This is the second section.  It has two short sentences.',
                // breaks on hard max with spaces
                "And one lonnnnnnnnnnnnnnnnnnng run on sentence that seems to go on forever but it can't be",
                'stopped, oh no it just keeps on going and going and going.'
            ]
        },
    ];

    testCases.forEach(({ description, splitterConfig, text, expected }) => {
        it(description, async () => {
            let splitter = new SbdSplitter(splitterConfig);
            let chunks = await splitter.splitText(text);
            console.log(chunks)
            expect(chunks).to.deep.equal(expected);
        });
    });


});


