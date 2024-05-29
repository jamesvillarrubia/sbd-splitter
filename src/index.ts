import * as tokenizer from 'sbd';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';

interface SbdSplitterOptions {
    chunkSize?: number;
    keepSeparator?: boolean;
    delimiters?: string[];
    sbd_marker?: string;
    softMaxChunkSize?: number;
    sbd_options?: tokenizer.Options;
}
export class SbdSplitter extends RecursiveCharacterTextSplitter {
  private sbd_marker: string;
  private softMaxChunkSize: number;
  private sbd_options: tokenizer.Options;
  private delimiters: string[];

  constructor (options: SbdSplitterOptions) {
    super({
      chunkSize: 1000, // Absolute max chunk size
      keepSeparator: true,
      delimiters: ['.', '?', '!'],
      ...options
    });
    this.sbd_marker = options.sbd_marker || '&#&#&#';
    this.softMaxChunkSize = options.softMaxChunkSize || 800;
    this.delimiters = [this.sbd_marker, ' ', ''];
    this.sbd_options = {
      newline_boundaries: false,
      html_boundaries: false,
      sanitize: false,
      allowed_tags: false,
      preserve_whitespace: true,
      abbreviations: undefined,
      ...options.sbd_options
    };
  }

  /**
     * Splits the input text into sentences using the tokenizer and then processes the text to split it further.
     * @param text - The input text to be split.
     * @param options - Additional options for splitting.
     * @returns An array of split text chunks.
     */
  async splitText (text: string, options: object = {}): Promise<string[]> {
    // Tokenize the text into sentences
    text = tokenizer.sentences(text, { ...this.sbd_options, ...options }).join(this.sbd_marker);
    const regex = new RegExp(this.sbd_marker, 'g');
    // Split the text further using the defined separators
    return (await this._customSplitText(text, this.separators)).map(c => c.replace(regex, ''));
  }

  /**
     * Merges the split text chunks into larger chunks while respecting the chunkSize and softMaxChunkSize limits.
     * @param splits - The array of split text chunks.
     * @param separator - The separator to use when joining chunks.
     * @param max - The maximum chunk size.
     * @returns An array of merged text chunks.
     */
  async mergeSplits (splits: string[], separator: string, max?: number): Promise<string[]> {
    max = max || this.softMaxChunkSize;
    const docs: string[] = [];
    let currentDoc: string[] = [];
    let total = 0;

    for (const d of splits) {
      const _len = await this.lengthFunction(d);

      if (total > max || total + _len > this.chunkSize) {
        if (currentDoc.length > 0) {
          // @ts-expect-error - joinDocs is a private function
          const doc = this.joinDocs(currentDoc, separator);
          if (doc !== null) {
            docs.push(doc);
            currentDoc = [];
            total = 0;
          }
        }
      }

      currentDoc.push(d);
      total += _len;
    }

    // @ts-expect-error - joinDocs is a private function
    const doc = this.joinDocs(currentDoc, separator);
    if (doc !== null) {
      docs.push(doc);
    }

    return docs;
  }

  /**
     * Recursively splits the text based on the provided separators and merges the splits into chunks.
     * @param text - The input text to be split.
     * @param separators - The array of separators to use for splitting.
     * @returns An array of final text chunks.
     */
  async _customSplitText (text: string, separators: string[]): Promise<string[]> {
    const finalChunks: string[] = [];
    let separator = separators[separators.length - 1];
    let newSeparators: string[] | undefined;

    for (let i = 0; i < separators.length; i += 1) {
      const s = separators[i];
      if (s === '') {
        separator = s;
        break;
      }
      if (text.includes(s)) {
        separator = s;
        newSeparators = separators.slice(i + 1);
        break;
      }
    }

    const postSBDseparators = separators.slice(separators.indexOf(this.sbd_marker) + 1);
    let goodSplits: string[] = [];
    const _separator = this.keepSeparator ? '' : separator;
    let splits = this.splitOnSeparator(text, separator);

    if (separator === this.sbd_marker) {
      const original = this.keepSeparator;
      this.keepSeparator = false;
      splits = this.splitOnSeparator(text, separator);
      this.keepSeparator = original;
    }

    const max = postSBDseparators.includes(separator) ? this.chunkSize : this.softMaxChunkSize;

    for (const s of splits) {
      const length = await this.lengthFunction(s);
      if (length < max) {
        goodSplits.push(s);
      } else {
        if (goodSplits.length) {
          const mergedText = await this.mergeSplits(goodSplits, _separator);
          finalChunks.push(...mergedText);
          goodSplits = [];
        }
        if (!newSeparators) {
          finalChunks.push(s);
        } else {
          const otherInfo = await this._customSplitText(s, newSeparators);
          finalChunks.push(...otherInfo);
        }
      }
    }

    if (goodSplits.length) {
      const mergedText = await this.mergeSplits(goodSplits, _separator, max);
      finalChunks.push(...mergedText);
    }

    return finalChunks;
  }
}
