'use strict';
/*
Web: cloudinary.com
Account: nttung19@clc.fitus.edu.vn
Password: ne6kaJv_JJiH&y2
*/

// run cmd: node cloudinaryExampleCode.js

const express = require('express');
const formidable = require('formidable'); // npm i formidable
const cloudinary = require('cloudinary').v2; // npm i cloudinary
require('dotenv').config(); // npm i dotenv

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();

app.get('/', (req, res) => {
  res.send(`
    <h2>With <code>"express"</code> npm package</h2>
    <form action="/api/upload" enctype="multipart/form-data" method="post">
      <div>Text field title: <input type="text" name="title" /></div>
      <div>File: <input type="file" name="someExpressFiles" multiple="multiple" /></div>
      <input type="submit" value="Upload" />
    </form>
  `);
});

app.post('/api/upload', async (req, res, next) => {
  const form = formidable({ multiples: true });

  form.parse(req, async (err, field, file) => {
    console.log(file);
    await cloudinary.uploader.upload(
      file.someExpressFiles.filepath,
      { public_id: `NMCNPM/${file.someExpressFiles.originalFilename}` }, // thay đổi đường dẫn và tên file
      function (error, result) {
        console.log(result);
      }
    ); // result.url là link ảnh
    if (err) {
      next(err);
      return;
    }
    res.json({ field, file });
  });
});

app.listen(8080, () => {
  console.log('Server listening on http://localhost:8080 ...');
});
