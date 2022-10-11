import express, { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';

const router = express.Router();

router.get('/', (_req: Request, res: Response): void => {
  fs.readdir(
    `${path.resolve(__dirname, '../../assets/images')}`,
    (err, _data) => {
      if (err) console.log(err.message);
      res
        .status(200)
        .sendFile(path.resolve(__dirname, '../helpers/listImages.html'));
    },
  );
});

export default router;
