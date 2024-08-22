const dotenv = require('dotenv');
const { mongoose } = require('mongoose');
dotenv.config({ path: './config.env' });
const app = require('./app');
const PORT = process.env.PORT || 8000;

const dbString = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(dbString)
  .then((conn) => console.log('DB Connection Successfull'));

app.listen(PORT, () => console.log('Server starter successfully'));
