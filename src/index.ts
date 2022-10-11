import express, { Request, Response } from 'express';
import imageList from './Routes/imageList';
import imageRouter from './Routes/image';
import path from 'path';
const app = express();
const port = 3000;

app.use('/listimages', imageList);
app.use('/images/convert', imageRouter);

app.get('/', (_req: Request, res: Response): void => {
  res.sendFile(path.resolve(__dirname, './helpers/index.html'));
});

app.listen(port, (): void => {
  console.log(`app listening on port ${port}`);
});

export default app;
