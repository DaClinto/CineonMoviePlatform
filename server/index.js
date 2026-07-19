import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
app.use(cors());

app.get('/api/stream', async (req, res) => {
  const { embedUrl } = req.query;
  if (!embedUrl) return res.status(400).json({ error: 'missing embedUrl' });
  try {
    const resp = await fetch(embedUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible)'
      }
    });
    const text = await resp.text();

    const patterns = [
      /https?:\/\/[^"'\s>]+\.m3u8[^"'\s>]*/i,
      /"(https?:\/\/[^"\s]+\.m3u8[^"\s]*)"/i,
      /'(https?:\/\/[^'\s]+\.m3u8[^'\s]*)'/i
    ];

    for (const pattern of patterns) {
      const match = text.match(pattern);
      if (match) {
        const streamUrl = match[1] || match[0];
        return res.json({ streamUrl });
      }
    }

    return res.status(404).json({ error: 'no m3u8 found' });
  } catch (err) {
    console.error('proxy error', err);
    return res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Proxy server listening on port ${PORT}`));
