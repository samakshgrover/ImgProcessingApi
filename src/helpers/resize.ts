import fs from 'fs';
import sharp from 'sharp';
import { setCache } from './cache';

interface Data {
  fileName: string;
  width: string;
  height: string;
}

async function resizeAndSendResponse(data: Data) {
  try {
    const readStream = fs.createReadStream(`./assets/images/${data.fileName}`);
    const sharpStream = sharp().resize(
      parseInt(data.width),
      parseInt(data.height),
    );
    const writeStream = await setCache(data.fileName, data.width, data.height);

    if (writeStream) {
      console.log('not cached image');
      readStream.pipe(sharpStream);
      sharpStream.pipe(writeStream);
      return sharpStream;
    } else {
      throw new Error('An Error occured while performing resizing opration');
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
}

export default resizeAndSendResponse;
