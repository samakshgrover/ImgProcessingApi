import { log } from 'console';
import express from 'express';
import sharp from 'sharp';
import path from 'path';

const app = express();
const port = 3000;

const resizeImg = (
  filename: string,
  width: number,
  height: number,
) => {
  try {
    sharp(`./assets/images/${filename}`)
      .resize(width, height)
      .toFile(
        `./assets/thumbnails/thumb_${width}_${
          height ? height : ''
        }_${filename}`,
      );
  } catch (err) {
    if (!err) return;
    console.log(err.message);
  }
};

app.get('/api/images', (req, res) => {
  const query = req.query;
  log(query);
  const { filename, width, height } = query;
  () => {
    if (
      typeof filename === 'string' &&
      typeof width === 'string' &&
      typeof height === 'string'
    ) {
      const widthNo = parseInt(width);
      const heightNo = parseInt(height);
      log({ filename, widthNo, heightNo });
      resizeImg(filename, widthNo, heightNo);
    }
    res.sendFile(
      `./assets/thumbnails/thumb_${width}_${height}_${filename}`,
    );
  };
});

app.get('/', (req, res) => {
  res.sendFile(
    path.resolve(
      ...[`${__dirname}/../assets/images/fjord.jpg`],
    ),
    (err) => {
      if (err) {
        console.log(err.message);
      }
      log(
        path.resolve(
          ...[`${__dirname}/../assets/images/fjord.jpg`],
        ),
      );
    },
  );
});

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

console.log(__filename);
