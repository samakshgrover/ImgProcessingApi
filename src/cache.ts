import findCacheDir from 'find-cache-dir';
import { constants, promises as fs, createWriteStream } from 'fs';
import path from 'path';

const cacheDir = findCacheDir({ name: 'out' });

const fileString = (width: string, height: string, fileName: string) => {
  const cacheFile = path.join(width + height + fileName);
  return cacheFile;
};

const setCache = async (
  fileName: string,
  width: string,
  height: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
) => {
  if (typeof cacheDir === 'string') {
    await fs.mkdir(cacheDir, { recursive: true });
    const cacheFile = fileString(width, height, fileName);
    return createWriteStream(`${cacheDir}/${cacheFile}`);
  }
};

const getCache = async (file: string) => {
  return await fs.readFile(`${cacheDir}/${file}`);
};

const checkCache = async (file: string) => {
  try {
    await fs.access(`${cacheDir}/${file}`, constants.F_OK);
    return true;
  } catch (error) {
    return false;
  }
};

export { setCache, getCache, checkCache, fileString };
