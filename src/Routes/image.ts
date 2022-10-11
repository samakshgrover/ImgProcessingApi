import express, { Request, Response } from 'express';
import { checkCache, fileString, getCache } from '../helpers/cache';
import resizeAndSendResponse from '../helpers/resize';

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
    throw new Error(
      `Invalid Query, please visit "/" for more information about Api`,
    );
  }
}

function validFileName(fileName: string) {
  if (!imgArr.includes(fileName)) throw new Error('Invalid File Name');
}

function validWidthAndHeight(width: string, height: string) {
  if (parseInt(width) || parseInt(height))
    throw new Error('Width And Height must be greater then zero');
}

router.get('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const { fileName, width, height } = req.query;
    const data = { fileName, width, height };

    assertIsImgData(data);
    validFileName(data.fileName);
    validWidthAndHeight(data.width, data.height);

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
      resizeAndSendResponse({ data, res });
    }
  } catch (error) {
    if (typeof error === 'string') {
      res.status(400).send(error);
    } else if (error instanceof Error) {
      res.status(400).send(error.message);
    }
  }
});
export default router;
