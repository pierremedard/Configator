import app from './app';
import * as express from 'express';
import * as path from "path";

require('dotenv').config();

const port = process.env.PORT || 3000;

app.listen(port, (err) => {
  if (err) return console.log(err);

  return console.log('Server listening...')
});