import {FS} from './src/fs.js';

const fs = FS('/topdir');
fs.store('filename1', 'a very long string1');
fs.store('filename2', 'a very long string1');
fs.store('filename3', 'a very long string3');
console.log(fs);
console.log(fs.get('filename1'));
console.log(fs.get('filename2'));
console.log(fs.get('filename3'));
console.log(fs.get('filename1') === fs.get('filename2'));
