import { Response } from 'express';
import fs from 'fs';
import sharp from 'sharp';
import { setCache } from './cache';

interface Data {
  fileName: string;
  width: string;
  height: string;
}

async function resizeAndSendResponse({
  data,
  res,
}: {
  data: Data;
  res: Response;
}) {
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
    sharpStream.pipe(res);
  }
}

export default resizeAndSendResponse;
