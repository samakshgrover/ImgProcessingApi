import express from 'express';
import fs from 'fs';
import sharp from 'sharp';
import { setCache, getCache, checkCache, fileString } from './cache';

const app = express();
const port = 3000;

app.get('/convert', async (req, res) => {
  const { fileName, width, height } = req.query;
  if (
    typeof fileName === 'string' &&
    typeof width === 'string' &&
    typeof height === 'string'
  ) {
    const file = fileString(width, height, fileName);
    if (await checkCache(file)) {
      const result = await getCache(file);
      res.writeHead(200, {
        'Content-Type': 'image/jpg',
        'Content-Length': result.length,
      });
      console.log('cached Image');
      res.end(result);
    } else {
      const readStream = fs.createReadStream(`./assets/images/${fileName}`);
      // const writeStream = fs.createWriteStream(
      //   `./output/${width}_${height}_${fileName}`,
      // );
      const sharpStream = sharp().resize(parseInt(width), parseInt(height));
      const writeStream = await setCache(fileName, width, height);
      if (writeStream) {
        console.log('not cached image');
        readStream.pipe(sharpStream);
        sharpStream.pipe(writeStream);
        sharpStream.pipe(res);
      }
    }
  }
});

app.listen(port, () => {
  console.log('running app on port 3000');
});
