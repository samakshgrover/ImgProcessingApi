import express from 'express';
import sharp from 'sharp';
import fs from 'fs';
import Cache from 'streaming-cache';
const cache = new Cache();

const app = express();
const port = 3000;

// const resizeImg = async (
//   fileName: string,
//   width: number,
//   height: number,
// ) => {
//   await sharp(fileName)
//     .resize(width, height)
//     .toFile(`output/${fileName}`);
// };

app.get('/', (req, res) => {
  res.send('starting the app');
});

app.get('/convert', (req, res) => {
  const { fileName, width, height } = req.query;
  if (
    typeof fileName === 'string' &&
    typeof width === 'string' &&
    typeof height === 'string'
  ) {
    const readable = fs.createReadStream(`./assets/images/${fileName}`);

    const sharpStream = sharp().resize(parseInt(width), parseInt(height));
    const writable = fs.createWriteStream(`./output/${fileName}`);
    readable.pipe(sharpStream);
    sharpStream.clone().pipe(res);
    sharpStream.clone().pipe(writable);
  }
});

app.get('/image', (req, res) => {
  const readable = fs.createReadStream('./assets/images/palmtunnel.jpg');
  readable.pipe(res);
});

app.get('/video', (req, res) => {
  const readable = fs.createReadStream(
    'Breaking-Bad s02ep8 720p brrip.sujaidr.mkv',
  );
  readable.pipe(res);
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
