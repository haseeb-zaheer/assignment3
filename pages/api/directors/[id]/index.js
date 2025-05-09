import clientPromise from '@/lib/mongodb';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { id } = req.query;

  try {
    const client = await clientPromise;
    const db = client.db('AP-A3');

    const director = await db.collection('directors').findOne({ id });

    if (!director) {
      return res.status(404).json({ error: 'Director not found' });
    }

    const movies = await db.collection('movies').find({ directorId: id }).toArray();

    res.status(200).json({ director, movies });
  } catch (error) {
    console.error('Error fetching director details:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
