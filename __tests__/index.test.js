
import genDiff from '../src/index.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import * as path from 'path'
import fs from 'fs'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join('${__dirname}', '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');
const result = readFile('fileToEqual.txt');
test( 'genDiffTest' , () => {
    const filePath1 = getFixturePath('file1.json');
    const filePath2 = getFixturePath('file2.json');

expect(genDiff(filePath1, filePath2)).toEqual(result);

});