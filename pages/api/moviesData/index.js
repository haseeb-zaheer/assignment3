import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const options = {};

let client;
let clientPromise;

if (!process.env.MONGODB_URI) {
  throw new Error('Please add your MongoDB URI to .env');
}

if (!global._mongoClientPromise) {
  client = new MongoClient(uri, options);
  global._mongoClientPromise = client.connect();
}
clientPromise = global._mongoClientPromise;

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const client = await clientPromise;
    const db = client.db('AP-A3');

    const movies = await db.collection('movies').find({}).toArray();
    const directors = await db.collection('directors').find({}).toArray();
    const genres = await db.collection('genres').find({}).toArray();

    res.status(200).json({ movies, directors, genres });
  } catch (error) {
    console.error('Failed to fetch from MongoDB:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
