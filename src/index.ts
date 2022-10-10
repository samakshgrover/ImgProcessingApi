import express from 'express';
import imageList from './Routes/imageList';
import imageRouter from './Routes/image';

const app = express();
const port = 5000;

app.use('/listimage', imageList);
app.use('/images/convert', imageRouter);

app.get('/', (req, res) => {
  res.send('App started');
});

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});

export default app;
