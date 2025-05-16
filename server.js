const express = require('express');
const cors = require('cors');
const { YoutubeTranscript } = require('youtube-transcript');

const app = express();
app.use(cors());

app.get('/transcript', async (req, res) => {
  const videoId = req.query.videoId;

  if (!videoId) {
    return res.status(400).json({ error: 'Missing videoId parameter' });
  }

  try {
    const transcript = await YoutubeTranscript.fetchTranscript(videoId);
    const textOnly = transcript.map(line => line.text).join(' ');
    res.json({ transcript: textOnly });
  } catch (err) {
    res.status(500).json({ error: 'Could not fetch transcript', details: err.message });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`📋 YouTube Transcript server running at http://localhost:${PORT}`);
});
