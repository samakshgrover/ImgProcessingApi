import express from 'express';
import fs from 'fs';
import path from 'path';

const router = express.Router();

router.get('/', (req, res) => {
  fs.readdir(
    `${path.resolve(__dirname, '../../assets/images')}`,
    (err, data) => {
      if (err) console.log(err.message);
      res.status(200).send(data);
    },
  );
});

export default router;
