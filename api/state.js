import { kv } from '@vercel/kv';

// Single shared record for this tracker. Fine for one person using
// their own private deployment across a few devices.
const KEY = 'fall-tracker-state';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const data = await kv.get(KEY);
    res.status(200).json(data || {});
    return;
  }

  if (req.method === 'POST') {
    let body = req.body;
    if (typeof body === 'string') {
      try { body = JSON.parse(body); } catch (e) { body = {}; }
    }
    await kv.set(KEY, body);
    res.status(200).json({ ok: true });
    return;
  }

  res.status(405).json({ error: 'Method not allowed' });
}
