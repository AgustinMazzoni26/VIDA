import { kv } from '@vercel/kv';

const STATE_KEY = 'vida-state';

export default async function handler(req, res) {
  try {
    if (req.method === 'GET') {
      const data = await kv.get(STATE_KEY);
      res.status(200).json(data || {});
      return;
    }

    if (req.method === 'POST') {
      let body = req.body;
      if (typeof body === 'string') {
        body = JSON.parse(body);
      }
      await kv.set(STATE_KEY, body);
      res.status(200).json({ ok: true });
      return;
    }

    res.status(405).json({ error: 'Method not allowed' });
  } catch (err) {
    console.error('Error en /api/data:', err);
    res.status(500).json({ error: 'Internal error' });
  }
}
