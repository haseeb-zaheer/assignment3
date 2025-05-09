import clientPromise from '@/lib/mongodb';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { id } = req.query;

  try {
    const client = await clientPromise;
    const db = client.db('AP-A3');

    const movies = await db.collection('movies').find({ genreId: id }).toArray();

    res.status(200).json(movies);
  } catch (error) {
    console.error('Error fetching movies by genre:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
