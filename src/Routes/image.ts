import express from 'express';
import { checkCache, fileString, getCache, setCache } from '../helpers/cache';
import sharp from 'sharp';
import fs from 'fs';

const router = express.Router();

interface ImgData {
  fileName: string;
  width: string;
  height: string;
}
const imgArr = [
  'encenadaport.jpg',
  'fjord.jpg',
  'icelandwaterfall.jpg',
  'palmtunnel.jpg',
  'santamonica.jpg',
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isImgData(valueToTest: any): valueToTest is ImgData {
  return (
    valueToTest &&
    typeof valueToTest === 'object' &&
    'fileName' in valueToTest &&
    typeof valueToTest['fileName'] === 'string' &&
    typeof valueToTest['width'] === 'string' &&
    typeof valueToTest['height'] === 'string'
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function assertIsImgData(valueToTest: any): asserts valueToTest is ImgData {
  if (!isImgData(valueToTest)) {
    throw new Error(`Value does not appear to be a ImgData${valueToTest}`);
  }
}

function validFileName(fileName: string) {
  if (!imgArr.includes(fileName)) throw new Error('Invalid File Name');
}

router.get('/', async (req, res) => {
  try {
    const { fileName, width, height } = req.query;
    const data = { fileName, width, height };

    assertIsImgData(data);
    validFileName(data.fileName);
    const file = fileString(data.width, data.height, data.fileName);

    if (await checkCache(file)) {
      const result = await getCache(file);
      res.writeHead(200, {
        'Content-Type': 'image/jpg',
        'Content-Length': result.length,
      });
      console.log('cached Image');
      res.end(result);
    } else {
      const readStream = fs.createReadStream(
        `./assets/images/${data.fileName}`,
      );
      const sharpStream = sharp().resize(
        parseInt(data.width),
        parseInt(data.height),
      );
      const writeStream = await setCache(
        data.fileName,
        data.width,
        data.height,
      );
      if (writeStream) {
        console.log('not cached image');
        readStream.pipe(sharpStream);
        sharpStream.pipe(writeStream);
        sharpStream.pipe(res);
      }
    }
  } catch (error) {
    res.status(400).send('bad request');
  }
});
export default router;
