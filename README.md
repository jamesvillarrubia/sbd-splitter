# SbdSplitter

The `SbdSplitter` is a custom text splitter class for LangChain.js that extends the `RecursiveCharacterTextSplitter` class. It utilizes the `sbd` library for sentence boundary detection and provides additional options for customizing the text splitting process.  

Because sentence boundaries are not a reliable break point for a given text, a "softmax" target chunk size option is included, which will allow one additional sentence to overrun. The `chunkSize` option remains the strict chunkSize max length. 

## Installation

To use the `SbdSplitter` in your LangChain.js project, follow these steps:

1. Install the required dependencies:

```bash
npm install langchain sbd
```

2. Import the `SbdSplitter` class in your code:

```javascript
import { SbdSplitter } from 'sbdsplitter';
```

## Usage

To create an instance of the `SbdSplitter`, you can provide various options to customize its behavior:

```javascript
const splitter = new SbdSplitter({
  chunkSize: 1000,
  keepSeparator: true,
  delimiters: ['\n\n','\n','&#&#&#', ' ',''];
  sbd_marker: '&#&#&#',
  softMaxChunkSize: 800,
  sbd_options: {
    newline_boundaries: false,
    html_boundaries: false,
    sanitize: false,
    allowed_tags: false,
    preserve_whitespace: true,
    abbreviations: null,
  },
});
```

- `chunkSize`: The absolute maximum chunk size (default: 1000). Recommended to be 20% higher than softmax.
- `keepSeparator`: Whether to keep the separator in the split chunks (default: true).
- `sbd_marker`: The marker used to join sentences after splitting (default: '&#&#&#').  Allows transformation of sentence boundaries once sentences are recombined into text for chunking.  Must be unique within the document.  Will be stripped out.  
- `softMaxChunkSize`: The soft maximum chunk size (default: 800).
- `sbd_options`: Additional options for the `sbd` library (see the `sbd` documentation for available options).

To split a text using the `SbdSplitter`, you can call the `splitText` method:

```javascript
const text = 'Your input text goes here...';
const chunks = await splitter.splitText(text);
```

The `splitText` method returns an array of split text chunks.

## Additional Options

The `SbdSplitter` allows you to customize the behavior of the `sbd` library by providing additional options through the `sbd_options` parameter. These options include:

- `newline_boundaries`: Whether to treat newlines as sentence boundaries (default: false).
- `html_boundaries`: Whether to treat HTML tags as sentence boundaries (default: false).
- `sanitize`: Whether to sanitize the input text (default: false).
- `allowed_tags`: An array of allowed HTML tags (default: false).
- `preserve_whitespace`: Whether to preserve whitespace in the split chunks (default: true).
- `abbreviations`: An array of abbreviations to consider during sentence boundary detection (default: null).

Please refer to the `sbd` [library documentation](https://www.npmjs.com/package/sbd) for more details on these options.

## Combining with Markdown

The default delimiters are basic line breaks with the sentence barrier: `['\n\n','\n','&#&#&#', ' ','']`.  But this can be extended to work with markdown as well.

```javascript
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
        "&#&#&#", //sentence delimiter goes here typically.
        " ",
        "",
    ];
```

With the above settings, the following code would breakdown markdown as shown:

```javascript
    const splitterConfig = { chunkSize: 90, separators: delimiters, softMaxChunkSize: 55 }
    const text = `# Header\n` + `a`.repeat(95) + `. First sentence goes here. Second sentence goes here. Third sentence goes here. Fourth sentence goes here. Fifth sentence goes here. Now for a really long sentences that will break on the hard max length so we can see that happen. \n## Second Section Title is also really long and goes past the soft max. \n### Third Section Title is also really long and goes past the soft max and past the chunk size by quite a bit, in fact it should stop here. \n## Fourth Section\nThis is the fourth section.  It has two short sentences.  And one lonnnnnnnnnnnnnnnnnnng run on sentence that seems to go on forever but it can't be stopped, oh no it just keeps on going and going and going.`
    const splitter = new SbdSplitter(splitterConfig);
    const chunks = await splitter.splitText(text);
    console.log(chunks)
```
This would be the result.  
```javascript
let result = [
    // breaks on \n at the end of the header
    "# Header",
    // breaks on hard max length
    'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
    'aaaaaa.',
    // breaks on softmax
    'First sentence goes here. Second sentence goes here. Third sentence goes here.',
    'Fourth sentence goes here. Fifth sentence goes here.',
    // breaks on hard max with spaces
    'Now for a really long sentences that will break on the hard max length so we can see that',
    'happen.',
    // breaks on softmax
    '## Second Section Title is also really long and goes past the soft max.',
    // breaks on hardmax
    '### Third Section Title is also really long and goes past the soft max and past the chunk',
    'size by quite a bit, in fact it should stop here.',
    // breaks on \n 
    '## Fourth Section',
    // breaks on soft max
    'This is the fourth section.  It has two short sentences.',
    // breaks on hard max with spaces
    "And one lonnnnnnnnnnnnnnnnnnng run on sentence that seems to go on forever but it can't be",
    'stopped, oh no it just keeps on going and going and going.'
]
```
    


## License

The `SbdSplitter` class is released under the [MIT License](https://opensource.org/licenses/MIT).

## Contributing

Contributions to the `SbdSplitter` class are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request on the GitHub repository.

## Acknowledgements

The `SbdSplitter` class is built on top of the `RecursiveCharacterTextSplitter` class from the LangChain.js library and utilizes the `sbd` library for sentence boundary detection.