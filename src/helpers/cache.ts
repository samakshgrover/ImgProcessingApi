import findCacheDir from 'find-cache-dir';
import { constants, promises as fs, createWriteStream } from 'fs';
import path from 'path';

const cacheDir = findCacheDir({ name: 'out' });

const fileString = (width: string, height: string, fileName: string) => {
  isString(cacheDir);
  const cacheFile = path.join(cacheDir, width + height + fileName);
  return cacheFile;
};

const setCache = async (fileName: string, width: string, height: string) => {
  if (typeof cacheDir === 'string') {
    await fs.mkdir(cacheDir, { recursive: true });
    const cacheFile = fileString(width, height, fileName);
    return createWriteStream(cacheFile);
  }
};

const getCache = async (file: string) => {
  return await fs.readFile(file);
};

const checkCache = async (file: string) => {
  try {
    await fs.access(file, constants.F_OK);
    return true;
  } catch (error) {
    return false;
  }
};

export { setCache, getCache, checkCache, fileString };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isString(valueToTest: any): asserts valueToTest is string {
  if (!(typeof valueToTest === 'string')) {
    throw new Error('not a string');
  }
}
