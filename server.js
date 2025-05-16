const express = require('express');
const cors = require('cors');
const { fetchTranscript } = require('youtube-transcript-plus');

const app = express();
app.use(cors());

app.get('/transcript', async (req, res) => {
  const videoId = req.query.videoId;
  if (!videoId) {
    return res.status(400).json({ error: 'Missing videoId parameter' });
  }

  try {
    const transcript = await fetchTranscript(videoId);
    const text = transcript.map(line => line.text).join(' ');
    res.json({ transcript: text });
  } catch (err) {
    res.status(500).json({ error: 'Could not fetch transcript', details: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Transcript API running on port ${PORT}`);
});
