require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 4000;
const MEDIA_DIR = process.env.MEDIA_DIR || path.join(__dirname, '../../media');

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.get('/api/media', (req, res) => {
  if (!fs.existsSync(MEDIA_DIR)) {
    return res.json([]);
  }
  const files = fs.readdirSync(MEDIA_DIR).filter(f => f.endsWith('.mp4'));
  res.json(files);
});

app.get('/api/media/video/:filename', (req, res) => {
  const filePath = path.join(MEDIA_DIR, req.params.filename);
  if (!fs.existsSync(filePath)) {
    return res.status(404).send('Not found');
  }
  const stat = fs.statSync(filePath);
  const fileSize = stat.size;
  const range = req.headers.range;
  if (range) {
    const [start, end] = range.replace(/bytes=/, '').split('-');
    const chunkStart = parseInt(start, 10);
    const chunkEnd = end ? parseInt(end, 10) : fileSize - 1;
    const stream = fs.createReadStream(filePath, { start: chunkStart, end: chunkEnd });
    res.writeHead(206, {
      'Content-Range': `bytes ${chunkStart}-${chunkEnd}/${fileSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': (chunkEnd - chunkStart) + 1,
      'Content-Type': 'video/mp4',
    });
    stream.pipe(res);
  } else {
    res.writeHead(200, { 'Content-Length': fileSize, 'Content-Type': 'video/mp4' });
    fs.createReadStream(filePath).pipe(res);
  }
});

app.listen(PORT, () => console.log(`Backend escuchando en http://localhost:${PORT}`));
