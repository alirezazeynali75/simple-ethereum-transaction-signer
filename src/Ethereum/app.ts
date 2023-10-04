import express from 'express';
import router from './router';
import getConfig from '../configs/config.env';
const app = express();
app.use(express.json());
app.use('/', router);

const port = getConfig("PORT",3000);
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});