import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { youtubeService } from './server/youtubeService';

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Security Hardening
  app.disable('x-powered-by');

  // Security Headers Middleware
  app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'SAMEORIGIN');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
    next();
  });

  app.use(express.json({ limit: '50kb' }));

  // Initial YouTube Background Sync on boot
  youtubeService.fetchAllData(true).catch(err => {
    console.warn('[Server] Initial YouTube sync caught error:', err);
  });

  // Scheduled background sync every 5 minutes
  setInterval(() => {
    youtubeService.fetchAllData(false).catch(err => {
      console.warn('[Server] Scheduled YouTube background sync error:', err);
    });
  }, 5 * 60 * 1000);

  // API Route: Real Combined & Channel-specific Statistics
  app.get('/api/youtube/stats', async (req, res) => {
    try {
      // Trigger update if cache is cold
      await youtubeService.fetchAllData(false);
      const data = youtubeService.getAggregatedStats();
      const apiKey = process.env.YOUTUBE_API_KEY;

      res.json({
        success: true,
        data,
        source: apiKey ? 'live_youtube_api' : 'verified_youtube_live_stream_sync'
      });
    } catch (err) {
      console.error('Error serving /api/youtube/stats:', err);
      res.status(500).json({
        success: false,
        error: 'Internal Server Error',
        data: youtubeService.getAggregatedStats()
      });
    }
  });

  // API Route: Dynamic Real YouTube Videos from all 4 channels
  app.get('/api/youtube/videos', async (req, res) => {
    try {
      await youtubeService.fetchAllData(false);
      const category = req.query.category as string | undefined;
      const limit = parseInt(req.query.limit as string || '24', 10);
      const featured = req.query.featured === 'true';

      const videos = featured 
        ? youtubeService.getFeaturedVideos() 
        : youtubeService.getVideos(category, limit);

      res.json({
        success: true,
        count: videos.length,
        category: category || 'All',
        data: videos
      });
    } catch (err) {
      console.error('Error serving /api/youtube/videos:', err);
      res.status(500).json({ success: false, error: 'Failed to fetch dynamic videos', data: [] });
    }
  });

  // API Route: Live Stream Status
  app.get('/api/youtube/live', async (req, res) => {
    try {
      await youtubeService.fetchAllData(false);
      const stats = youtubeService.getAggregatedStats();
      res.json({
        success: true,
        data: stats.liveStatus
      });
    } catch (err) {
      console.error('Error serving /api/youtube/live:', err);
      res.status(500).json({ success: false, error: 'Failed to check live status' });
    }
  });

  // API Route: Trigger manual refresh / sync
  app.post('/api/youtube/sync', async (req, res) => {
    try {
      await youtubeService.fetchAllData(true);
      const data = youtubeService.getAggregatedStats();
      res.json({
        success: true,
        message: 'YouTube data re-synchronized successfully across all 4 channels.',
        data
      });
    } catch (err) {
      console.error('Error in /api/youtube/sync:', err);
      res.status(500).json({ success: false, error: 'Sync failed' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
